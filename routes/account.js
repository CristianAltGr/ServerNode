import express from "express";
import { USER_BD } from '../bd.js';
import userModel from "../esquemas/user-schema.js";

const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
    console.log(req.ip);

    next(); // és importante ja qe éstamos en un paso intermedio , hacemos i luego lo 
    //mandamos al metodo que la a llamado
});


accountRouter.get('/:id', async (req, res) => {

    const id = req.params.id
    //el .exec realmente no és necesario pero se pone para devolver una promesa, sino lo tenemos
    //mongo por debajo hace algo por el estilo
    const user = await userModel.findOne({ "guid": id }).exec();

    if (!user) {
        res.status(404).send();
    }

    res.send(user);
});

//Crear nueva cuenta
accountRouter.post('/', async (req, res) => {

    const { id, name } = req.body; //destructuramos la info que recibamos

    if (!name || !id) {
        res.state(400).send();
    }

    const user = await userModel.findOne({ guid: id }).exec();

    if (user) { //si ya existe el usuario
        res.status(409).send();
    } else {
        //utilizando clases
        const newUser = new userModel({ guid: id, name: name }); //creamos user
        await newUser.save(); //guardamos en DB
    }

    res.send("Usuario añadido");
});

//Actualizar cuenta
accountRouter.patch('/:id', async (req, res) => {
    const id = req.params.id
    const user = await userModel.findOne({ guid: id }).exec();

    const { name } = req.body;

    if (!name) {
        res.state(400).send();
    } else if (user === -1) {
        res.status(404).send(); //recordar que hace como un return i aqui acaba
    }
    //modificamos el name
    user.name = name;
    //guardamos en DB
    await user.save();

    res.send();
});

//eliminar una cuenta
accountRouter.delete('/:id', async (req, res) => {
    const id = req.params.id

    const user = await userModel.findOne({ guid: id }).exec();

    if (!user) {
        res.status(404).send(); //recordar que hace como un return i aqui acaba
    } else {
        try {
            await user.deleteOne();
            res.send("El usuario ha sido eliminado");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al eliminar el usuario");
        }
    }
});

export default accountRouter;