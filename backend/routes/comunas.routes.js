const { postComuna, getComunas,borrarComuna,actualizarComuna } = require('../controllers/comuna.controllers')
const {check} = require('express-validator')
const {isAdminRole} = require('../helpers/db.validators.usuarios')
const routerComuna = require('express').Router()
const{validateDocuments}= require('../middlewares/validate.documents')
const validateJWT = require('../middlewares/validate.jwt')

//POST COMUNA
routerComuna.post('/',[check('nombre','El nombre de la comuna es necesario').not().isEmpty(),validateJWT,isAdminRole,validateDocuments],postComuna) //POST//localhost:8001/api/comunas
//GET COMUNA
routerComuna.get('/',[validateJWT,isAdminRole,validateDocuments],getComunas )//GET//localhost:8001/api/comunas?page=1&perPage=10
//DELETE COMUNA
routerComuna.delete('/:id',[validateJWT,isAdminRole,validateDocuments],borrarComuna)//DELETE // localhost:8001/api/comunas/ID
//PUT COMUNA
routerComuna.put('/:id',[validateJWT,isAdminRole,validateDocuments],actualizarComuna)//PUT//localhost:8001/api/comunas/ID
module.exports= routerComuna;