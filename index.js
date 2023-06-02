console.clear();
import createExpressServer from 'express';

const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());

//obtener detalles de una cuenta

//Crear nueva cuenta

//Actualizar cuenta

//eliminar una cuenta


expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 