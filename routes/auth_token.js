import { Router } from "express";
import { authUser } from "../helpers/authbymail.js";
import { SignJWT, jwtVerify } from "jose";
import { USER_BD } from "../bd.js";

const sessions = []; //array de ssesionses iniciadas
const auhtTokenRouter = Router();
const encoder = new TextEncoder(); //creamos este objeto para codificar el string luego

auhtTokenRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
        const user = authUser(email, password);
        const guid = user.guid;
        const jwdConstructor = new SignJWT({ guid }); //lo iniciamos con el guid del usuario en verdad este es el contructor i 
        // no la clase esto lo hace porque al crear el objecto lo haremos con kmetodos de la clase poruqe necesitamos un await para la firma

        //parametros -> setProtecteHead -> algoritmo i typo de token
        //steIssuedAT -> fecha cración 
        //setExpiración timepo que caduca el token
        //sign creacion de firma és una promesa por lo que hara falta un await 
        const jwt = await jwdConstructor.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h').sign(encoder.encode(process.env.JWT_KEY)); //imporatmos el token desde el env tiene que ser en el fomrato adequado no string

        // se puede hacer cookie pero vigilar el lentgh

        return res.send({ jwt }); //lo devolvemos en el response
    } catch (error) {
        return res.sendStatus(401);
    }
});


auhtTokenRouter.get("/profile", async (req, res) => {

    const { authorization } = req.headers; //dentro de la cabecera podemos meter este header donde ira el token

    if (!authorization) return res.sendStatus(401);

    try {
        const jwtData = await jwtVerify(authorization, encoder.encode(process.env.JWT_KEY));
        console.log(jwtData);

        const user = USER_BD.find(user => user.guid === jwtData.payload.guid);

        if (!user) return res.sendStatus(401);

        delete user.password

        return res.send(user);

    } catch (error) {
        return res.sendStatus(401);
    }
});

export default auhtTokenRouter;