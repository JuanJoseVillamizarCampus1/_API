const Role = require('../models/Role');

const postRole = async (req,res)=>{
    try {
        const {rol}=req.body
        const rolDb= await Role.findOne({rol})
        if (rolDb) {
            return res.status(400).json({
                msg: `Este Rol ${rolDb.rol} ya existe `
              });
        }
        const roles = new Role({rol})
        await roles.save()
        res.status(201).json(roles)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getRoles = async ( req,res)=>{
    try {
        const roles = await Role.find()
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({ msg: 'Error al obtener los roles' });
    }
}
module.exports = {postRole,getRoles};