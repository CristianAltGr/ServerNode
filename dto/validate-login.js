import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const loginDTOSinclair = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: 'El tipo de email debe ser un string',
                format: 'email debe contener un email valido'
            }
        }),
        password: Type.String({
            errorMessage: {
                type: 'El tipo de password debe ser un string',
            }
        })
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato no és correto el numero de propiedades és erroneo'
        }
    }
);
//con esta función genera el DTOSCHEMA que hemos hecho anteriormente
const validate = ajv.compile(loginDTOSinclair);

const validateLoginDTO = (req, res, next) => {

    const isValidate = validate(req.body); // valida el schema esta es una función de ajv i devuelve un boolean

    if (!isValidate) res.status(400).send(ajv.errorsText(validate.errors, { separator: "\n" }));

    next();
};

export default validateLoginDTO;