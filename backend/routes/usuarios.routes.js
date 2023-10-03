const { postUsuario, getUsuarios,deleteUsuarios,putUsuarios } = require('../controllers/usuarios.controllers');
const {validateDocuments} = require('../middlewares/validate.documents');
const {check} = require('express-validator');
const {isValidRole,emailExiste}= require('../helpers/db.validators.usuarios');
const routesUsuarios = require('express').Router();

routesUsuarios.get('/',getUsuarios) //POST// http://localhost:8001/api/usuarios
routesUsuarios.post('/',[check('nombre','El nombre no es valido').not().isEmpty(),check('apellido','El apellido no es valido').not().isEmpty(),check('contraseña','La contraseña debe contener minimo 6 caracteres').isLength({min:6}),check('correoElectronico','El correo no es valido').isEmail(),check('correoElectronico').custom(emailExiste),check('rol').custom(isValidRole),validateDocuments],postUsuario) //GET//http://localhost:8001/api/usuarios
routesUsuarios.delete('/:id',[check('id','No es un ID valido').isMongoId(),check('id'),validateDocuments],deleteUsuarios) //DELETE// http://localhost:8001/api/usuarios/ID
routesUsuarios.put('/:id',[check('id', 'No es un ObjectID MongoDB válido').isMongoId(), check('rol').custom(isValidRole),validateDocuments],putUsuarios)//PUT // localhost:8001/api/usuarios/ID

module.exports= routesUsuarios