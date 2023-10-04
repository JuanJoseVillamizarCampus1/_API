const routerDenunica = require('express').Router()
const {check}= require('express-validator');
const { postDenuncia } = require('../controllers/denuncia.controllers');

routerDenunica.post('/',postDenuncia);

module.exports= routerDenunica;