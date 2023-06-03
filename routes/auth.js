import { Router } from "express";
import { USER_BD } from "../bd";

const authRouter = Router();

//Endpoints public (No autenticado ni autorizado)
authRouter.get("public", (req, res) => res.send(" Endpoint público!"));

//endpoint autenticado
authRouter.post("autenticado", (req, res) => {
    const { email, password } = req.body;

    if (!email, !password) return res.send(400);

    const user = USER_BD.filter(user => user.email == email && user.password == password);

    if (!user) return res.send(401);
    // codigos de error 401 no autenticado 403 no autorizado
    res.send(` Usuario ${user.name} correcto`);
});

//endpoint autenticado i autorizado
authRouter.post("autorizado", (req, res) => {
    const { email, password } = req.body;

    if (!email, !password) return res.send(400);

    const user = USER_BD.filter(user => user.email == email && user.password == password);

    if (!user) return res.send(401);
    // codigos de error 401 no autenticado 403 no autorizado

    if (user.role === "admin") {
        res.send(` Usuario administrador ${user.name} correcto`);
    } else {
        return res.send(403);
    }
});


export default authRouter;                     