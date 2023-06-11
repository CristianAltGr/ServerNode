console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth_token.js';
import authSessionRouter from './routes/auth_session.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const PORT = parseInt(process.env.PORT);
const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());
expressServer.use(cookieParser());

expressServer.use('/cuenta', accountRouter);
expressServer.use('/auth', authRouter);

expressServer.use("/auth-token", authTokenRouter);
expressServer.use("/auth-session", authSessionRouter);

expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 