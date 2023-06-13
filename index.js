console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth_token.js';
import authSessionRouter from './routes/auth_session.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


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

const loadAndRun = async () => {

    await mongoose.connect(process.env.MONGODB_URL);

    expressServer.listen(PORT, () => {
        console.log("Servidor levantado en el puerto: " + PORT);
    });
}

loadAndRun();