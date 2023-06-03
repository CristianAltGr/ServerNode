console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';


dotenv.config();

const PORT = parseInt(process.env.PORT);
const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());
expressServer.use('/cuenta', accountRouter);
expressServer.use('/auth', authRouter);


expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 