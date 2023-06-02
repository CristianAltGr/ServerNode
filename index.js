console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import { USER_BD } from './bd';

dotenv.config();

const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());

//LA Ruta serà la misma ya que la diferencia viene en el metodo si és get, post etc..
//obtener detalles de una cuenta
expressServer.get('/cuenta', (req, res) = {

});
//Crear nueva cuenta
expressServer.post('/cuenta', (req, res) = {

});
//Actualizar cuenta
expressServer.patch('/cuenta', (req, res) = {

});
//eliminar una cuenta
expressServer.delete('/cuenta', (req, res) = {

});

expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 