const { postDelito, getDelitos,borrarDelito,getAllDelitos,getDelitosAarchivados } = require('../controllers/delitos.controllers')
const {check} = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents');
const validateJWT =require('../middlewares/validate.jwt')
const {permisosRol,userExistsById} = require('../helpers/db.validators.usuarios')
const routerDelito = require('express').Router();
//POST DELITO
routerDelito.post('/',[check('tipoDelito','El tipo de delito no es valido').not().isEmpty(),check(),check('descripcion','La descripcion no es valida').not().isEmpty(),check('direccion','La direccion no es valida').not().isEmpty(),check('comuna','La comuna no es valida').not().isEmpty(),validateDocuments],postDelito) //POST//localhost:8001/api/delitos
//GET DELITOS ARCHIVADOS
routerDelito.get('/archivados',[validateJWT,permisosRol,validateDocuments],getDelitosAarchivados)//GET//localhost:8001/api/delitos/archivados?page=1&perPage=10
//  GET DELITOS EN CURSO
routerDelito.get('/',[validateJWT,permisosRol,validateDocuments],getDelitos)//GET//localhost:8001/api/delitos?page=1&perPage=10
//GET ALL DELITOS
routerDelito.get('/all',[permisosRol,validateDocuments],getAllDelitos)//GET//localhost:8001/api/delitos/all?page=1&perPage=10
routerDelito.delete('/:id',[validateJWT,permisosRol,check('id', 'No es un ID válido').isMongoId(),
check('id').custom(userExistsById),validateDocuments],borrarDelito)//DELETE//localhost:8001/api/delitos/id

module.exports= routerDelito