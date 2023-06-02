console.clear();
import createExpressServer from 'express';
import dotenv from 'dotenv';
import { USER_BD } from './bd.js';

dotenv.config();

const PORT = parseInt(process.env.PORT);
const expressServer = createExpressServer();

expressServer.use(createExpressServer.json());
expressServer.use(createExpressServer.text());

//LA Ruta serà la misma ya que la diferencia viene en el metodo si és get, post etc..
//obtener detalles de una cuenta
expressServer.get('/cuenta/:id', (req, res) => {
    // si llamaramos igual la variable podrias destructurar -> const { guid } = req.params
    const id = req.params.id
    //find un elemento , filter array, repasar js igual que solo dos == en vez de tres
    const user = USER_BD.find(user => user._id == id || user.id == id);
    // Si no encontramos ninguno debolveremos un status code de 404
    if (!user) {
        res.status(404).send();
    }

    res.send(user);
});

//Crear nueva cuenta
expressServer.post('/cuenta', (req, res) => {

    const { id, name } = req.body; //destructuramos la info que recibamos

    if (!name || !id) {
        res.state(400).send();
    }
    const user = USER_BD.find(user => user._id == id || user.id == id);

    if (user) { //si ya existe el usuario
        res.status(409).send();
    } else {
        USER_BD.push({
            id,
            name
        })
    }

    res.send("Usuario añadido");
});

//Actualizar cuenta
expressServer.patch('/cuenta/:id', (req, res) => {
    const id = req.params.id
    const user = USER_BD.find(user => user._id == id || user.id == id);
    const { name } = req.body;

    if (!name) {
        res.state(400).send();
    } else if (user === -1) {
        res.status(404).send(); //recordar que hace como un return i aqui acaba
    }

    user.name = name;

    res.send();
});

//eliminar una cuenta
expressServer.delete('/cuenta/:id', (req, res) => {
    const id = req.params.id

    const userIndex = USER_BD.findIndex(user => user._id == id || user.id == id);

    if (userIndex === -1) {
        res.status(404).send(); //recordar que hace como un return i aqui acaba
    }
    USER_BD.splice(userIndex, 1);
    res.send("El usuario a sido eliminado");
});

expressServer.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: " + PORT);
}); 