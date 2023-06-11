import { Router } from "express";
import { authUser } from "../helpers/authbymail.js";
import { nanoid } from "nanoid";
import { USER_BD } from "../bd.js";

const sessions = []; //array de ssesionses iniciadas
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
        const user = authUser(email, password);
        // El ususrio és correcto creamos un id aletorio con  una libreria
        const sessionId = nanoid();
        const guid = user.guid;
        sessions.push({ sessionId, guid });

        res.cookie('sessionId', sessionId, {
            httpOnly: true
        });
        //Ahora a parte del mensaje también estamos andando la cookie
        return res.send(`Hola ${user.name} estas autenticado`);
    } catch (error) {
        return res.sendStatus(401);
    }
});


authSessionRouter.get("/profile", (req, res) => {
    //para leer las cookies necesitaremos parsear las cokkies para eso instalamos el parser
    //console.log(req.cookies);

    const { cookies } = req; //decontruimos el req cookies

    if (!cookies.sessionId) return res.sendStatus(401);

    const userSession = sessions.find(session => session.sessionId === cookies.sessionId); //buscamos la ssesión en el aary de sessiones

    if (!userSession) return res.sendStatus(401); //si no existe el usuario pero si el id (nos la intentan colar)

    const user = USER_BD.find(user => user.guid === userSession.guid);

    console.log(userSession);
    if (!user) return res.sendStatus(401);

    delete user.password

    return res.send(user);
});

export default authSessionRouter;