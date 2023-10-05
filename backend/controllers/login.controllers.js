const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {generateJWT} = require("../helpers/generate.jwt");

const login = async (req, res) => {
  try {
    const { correoElectronico, contraseña} = req.body;
    const usuario = await Usuario.findOne({correoElectronico});
    if(!usuario){
        return res.status(401).json({ msg: 'Credenciales inválidas' });
    }
    if (!usuario.estado) {
        return res.status(401).json({ msg: 'Usuario inactivo' });
    }
    const validContraseña = bcryptjs.compareSync(contraseña, usuario.contraseña);
    if(!validContraseña){
        return res.status(401).json({ msg: 'Credenciales inválidas' });
    }
    if (usuario.rol === 'Autoridad' || usuario.rol === 'Admin') {
        // El usuario tiene un rol válido, genera el token.
        const token = await generateJWT(usuario.id);
        // Devuelve el token en la respuesta.
        return res.json({usuario, token});
      } else {
        // El usuario no tiene un rol válido, no genera el token.
        return res.status(403).json({ msg: 'No tienes permisos para generar un token' });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor xd' });
  }
};

module.exports=login;