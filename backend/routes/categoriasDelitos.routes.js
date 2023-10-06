const routesCategorias = require('express').Router();
const {isAdminRole} = require('../helpers/db.validators.usuarios')
const{validateDocuments}= require('../middlewares/validate.documents')
const validateJWT = require('../middlewares/validate.jwt')
const {check} = require('express-validator');
const { getCategorias, postCategoriaDelito,borrarCategoria,actualizarCategoria } = require('../controllers/categoria.controllers');

//POST categorias delito
routesCategorias.post('/',[check('nombre','El nombre del tipo de delito es necesario').not().isEmpty(),check('descripcion','la descripcion del tipo de delito es necesaria').not().isEmpty(),validateJWT,isAdminRole,validateDocuments],postCategoriaDelito);//POST//http://localhost:8001/api/categoriasDelitos


//GET CATEGORIAS
routesCategorias.get('/',[validateJWT,isAdminRole,validateDocuments],getCategorias);//GET//http://localhost:8001/api/categoriasDelitos
routesCategorias.get('/all',getCategorias);//GET//http://localhost:8001/api/categoriasDelitos/all
//DELETE CATEGORIAS
routesCategorias.delete('/:id',[validateJWT,isAdminRole,validateDocuments],borrarCategoria)//DELETE // localhost:8001/api/comunas/ID}

//PUT CATEGORIAS
routesCategorias.put('/:id',[validateJWT,isAdminRole,validateDocuments],actualizarCategoria)//DELETE // localhost:8001/api/comunas/ID

module.exports= routesCategorias;