const Role = require ('../models/Role')
const Usuario = require('../models/Usuario')

const isValidRole = async (rol='')=>{
    const existeRol = await Role.findOne({rol})
    if (!existeRol){
        throw new Error (`El rol ${rol} no esta registrado en la base de datos`)
    }
}
const emailExiste = async( correoElectronico = '' ) => {
    const existeEmail = await Usuario.findOne({correoElectronico});
    if(existeEmail){
        //12.  Gestionamos error.
        throw new Error(`El email: ${ correoElectronico }, ya está registrado`);
    }
 }
module.exports={isValidRole,emailExiste}