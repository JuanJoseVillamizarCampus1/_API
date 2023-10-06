const routerDenunica = require('express').Router();
const {check}= require('express-validator');
const { postDenuncia, getDenunciasAnonimas, deletedenuncia,getDenunciasTotales,getDenunciasarchivadas } = require('../controllers/denuncia.controllers');
const { validateDocuments } = require('../middlewares/validate.documents');
const validateJWT =require('../middlewares/validate.jwt')
const {permisosRol} = require('../helpers/db.validators.usuarios')

//POST
routerDenunica.post('/',[check('tipoDelito','El tipo de delito no es valido').not().isEmpty(),check('descripcion','La descripcion no es valida').not().isEmpty(),check('direccion','La direccion no es valida').not().isEmpty(),validateDocuments],postDenuncia);//POST// http://localhost:8001/api/denuncia-anonima
//GET DENUNCIAS EN CURSO
routerDenunica.get('/',[validateJWT,permisosRol,validateDocuments],getDenunciasAnonimas)//GET activas//http://localhost:8001/api/denuncia-anonima?page=1&perPage=10
//GET DENUNCIAS Archivadas
routerDenunica.get('/archivados',[validateJWT,permisosRol,validateDocuments],getDenunciasarchivadas)//GET//http://localhost:8001/api/denuncia-anonima/archivados?page=1&perPage=10
//GET TODAS INCLUIDAS ARCHIVADAS
routerDenunica.get('/all',[permisosRol,validateDocuments],getDenunciasTotales)//http://localhost:8001/api/denuncia-anonima/all?page=1&perPage=10
//DELETE
routerDenunica.delete('/:id',[validateJWT,permisosRol,check('id', 'No es un ID válido'),validateDocuments],deletedenuncia) //DELETE//http://localhost:8001/api/denuncia-anonima/



module.exports= routerDenunica;