const { postUsuario, getUsuarios,deleteUsuarios,putUsuarios } = require('../controllers/usuarios.controllers');
const {validateDocuments} = require('../middlewares/validate.documents');
const {check} = require('express-validator');
const {isValidRole,emailExiste,isAdminRole}= require('../helpers/db.validators.usuarios');
const routesUsuarios = require('express').Router();

//GET Usuarios activos
routesUsuarios.get('/',getUsuarios)//GET//http://localhost:8001/api/usuarios 

//POST usuarios
routesUsuarios.post('/',[check('nombre','El nombre no es valido').not().isEmpty(),check('apellido','El apellido no es valido').not().isEmpty(),check('contraseña','La contraseña debe contener minimo 6 caracteres').isLength({min:6}),check('correoElectronico','El correo no es valido').isEmail(),check('correoElectronico').custom(emailExiste),check('rol').custom(isValidRole),validateDocuments],postUsuario) //POST// http://localhost:8001/api/usuarios

//DELETE USUARIOS
routesUsuarios.delete('/:id',[check('id','No es un ID valido').isMongoId(),check('id'),isAdminRole,validateDocuments],deleteUsuarios) //DELETE// http://localhost:8001/api/usuarios/ID

//PUT USUARIOS
routesUsuarios.put('/:id',[check('id', 'No es un ObjectID MongoDB válido').isMongoId(), check('rol').custom(isValidRole),isAdminRole,validateDocuments],putUsuarios)//PUT // localhost:8001/api/usuarios/ID

module.exports= routesUsuarios