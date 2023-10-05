const {postRole, getRoles} = require('../controllers/role.controllers')
const {isAdminRole} = require('../helpers/db.validators.usuarios')
const{validateDocuments}= require('../middlewares/validate.documents')
const validateJWT = require('../middlewares/validate.jwt')
const {check} = require('express-validator')

const routesRole = require('express').Router()

routesRole.post('/',[check('rol','El nombre del rol es necesario').not().isEmpty(),validateJWT,isAdminRole,validateDocuments],postRole)//POST//http://localhost:8001/api/roles
routesRole.get('/',[validateJWT,isAdminRole,validateDocuments],getRoles)//GET//http://localhost:8001/api/roles

module.exports= routesRole