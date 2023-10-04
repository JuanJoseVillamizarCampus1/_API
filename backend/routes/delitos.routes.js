const { postDelito, getDelitos,borrarDelito } = require('../controllers/delitos.controllers')
const {check} = require('express')
const routerDelito = require('express').Router()

routerDelito.post('/',postDelito) //POST//localhost:8001/api/delitos
routerDelito.get('/',getDelitos)//GET//localhost:8001/api/delitos
routerDelito.delete('/:id',borrarDelito)//DELETE//localhost:8001/api/delitos/id

module.exports= routerDelito