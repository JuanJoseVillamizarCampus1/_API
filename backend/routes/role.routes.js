const {postRole, getRoles} = require('../controllers/role.controllers')

const routesRole = require('express').Router()

routesRole.post('/',postRole)//POST//http://localhost:8001/api/roles
routesRole.get('/',getRoles)//GET//http://localhost:8001/api/roles

module.exports= routesRole