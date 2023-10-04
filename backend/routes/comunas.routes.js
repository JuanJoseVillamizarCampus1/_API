const { postComuna, getComunas } = require('../controllers/comuna.controllers')
const {check} = require('express')
const routerComuna = require('express').Router()

routerComuna.post('/',postComuna) //POST//localhost:8001/api/comunas
routerComuna.get('/',getComunas )//GET//localhost:8001/api/comunas
module.exports= routerComuna;