import { Router } from "express";
import { authUser } from "../helpers/authbymail.js";

const authTokenRouter = Router();

authTokenRouter.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
        const user = authUser(email, password);

        return res.send(`Hola ${user.name} estas autenticado`);
    } catch (error) {
        return res.sendStatus(401);
    }
});

export default authTokenRouter;