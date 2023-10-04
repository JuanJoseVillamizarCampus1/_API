const routerLogin= require('express').Router();
const {check} = require('express-validator');
const login = require('../controllers/login.controllers');
const {validateDocuments} = require('../middlewares/validate.documents');

routerLogin.post('/',[check('correoElectronico','El correo es obligatorio').not().isEmpty().isEmail(),check('contraseña','La contraseña es obligatoria').not().isEmpty(),validateDocuments],login)

module.exports= routerLogin