const routesCategorias = require('express').Router();
const check = require('express-validator');
const { getCategorias, postCategoriaDelito } = require('../controllers/categoria.controllers');


routesCategorias.get('/',getCategorias);//GET//http://localhost:8001/api/categoriasDelitos
routesCategorias.post('/',postCategoriaDelito);//POST//http://localhost:8001/api/categoriasDelitos

module.exports= routesCategorias;