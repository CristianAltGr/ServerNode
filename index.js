console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';


dotenv.config();

const PORT = parseInt(process.env.PORT);
const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());
expressServer.use('/cuenta', accountRouter);

expressServer.get('/ruta2', (req, res) => {
    res.send();
});

expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 