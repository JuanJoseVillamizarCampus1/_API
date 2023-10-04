const routerDenunica = require('express').Router();
const {check}= require('express-validator');
const { postDenuncia, getDenunciasAnonimas, deletedenuncia } = require('../controllers/denuncia.controllers');
const { validateDocuments } = require('../middlewares/validate.documents');

//POST
routerDenunica.post('/',[check('tipoDelito','El tipo de delito no es valido').not().isEmpty(),check('descripcion','La descripcion no es valida').not().isEmpty(),check('direccion','La direccion no es valida').not().isEmpty(),validateDocuments],postDenuncia);//POST// http://localhost:8001/api/denunciaAnonima

//GET
routerDenunica.get('/',getDenunciasAnonimas)//GET//http://localhost:8001/api/denuncia-anonima?page=2&perPage=20

//DELETE
routerDenunica.delete('/:id',deletedenuncia)

module.exports= routerDenunica;