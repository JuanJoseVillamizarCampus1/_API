const Usuario = require('../models/Usuario')
const salt = require('bcryptjs').genSaltSync()
//Post usuarios new usuarios
const postUsuario = async (req,res)=>{
    try {
        const {nombre,apellido,correoElectronico,contraseña,rol,ubicacion,estado}= req.body
        const usuario = new Usuario({nombre,apellido,correoElectronico,contraseña,rol,ubicacion,estado})
        usuario.contraseña= require('bcryptjs').hashSync(contraseña,salt)
        await usuario.save()
        res.status(201).json(usuario)
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Todos los datos son obligatorios' });
    }
}
//Traer todos los usuarios
const getUsuarios = async (req,res)=>{
    try {
        const usuarios= await Usuario.find({estado:true});
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(404).json({ msg: 'Error al obtener usuarios' });
    }
}
//Delete usuarios
const deleteUsuarios = async (req, res)=>{
    //extrayendo id de la url de la req
    const {id} = req.params

    //borrado fisico en DB
   /*  const usuario = await Usuario.findByIdAndDelete(id); */

    // borrado virtual.  solo se cambia el estado a false del usuario asociado al id en cuestion
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario)
}
//PUT usuraios
const putUsuarios = async (req,res)=>{
    try {
        const {id}= req.params
        const{_id,estado,contraseña,...resto}=req.body
        if(contraseña){
            resto.contraseña= require('bcryptjs').hashSync(contraseña,salt)
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
        res.json({
            msg:"Usuario Actualizado",
            usuario: usuario
        }) 
    } catch (error) {
        res.status(400).json({ msg: 'Error de validación: verifica los datos proporcionados.', error: error.message });
    }
}
module.exports= {postUsuario,getUsuarios,deleteUsuarios,putUsuarios}