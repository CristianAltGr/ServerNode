const DTO_PROPERY = ['email, password'];

const LoginDTOSchema = {
    type: 'object',
    propierties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    additionalPropierties: false
}

const validateLoginDTO = (req, res, next) => {

    const loginDto = req.body;
    if (typeof loginDto !== 'object') res.status(400).send('El formato no és correcto');

    const bodyPropiertyNames = Object.keys(loginDto);
    //miramos si tienen el mismo num de elementos i luego comporobamos los mismos
    const checkPropierty = (bodyPropiertyNames.length === DTO_PROPERY.length) && (bodyPropiertyNames.every((bodyPropiertyName) => DTO_PROPERY.includes(bodyPropiertyName)));

    if (!checkPropierty) {
        res.status(400).send('El body debe contenr las mismas propiedades');
    }
};

export default validateLoginDTO;