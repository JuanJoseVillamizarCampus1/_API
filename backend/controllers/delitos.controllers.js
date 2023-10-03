const Delito = require('../models/Delito')
const Usuario = require('../models/Usuario')
//Agregar Delito
const postDelito = async (req, res) => {
    try {
      const { tipoDelito, ubicacion, descripcion, usuarioReporte } = req.body;
      // Verifica si el usuario existe
      const usuarioExiste = await Usuario.findById(usuarioReporte);
      if (!usuarioExiste) {
        return res.status(404).json({ msg: 'El usuario no existe.' });
      }
      // Crea el objeto Delito sin el campo usuarioAsignado
      const delitoData = {
        tipoDelito,
        ubicacion,
        descripcion,
        usuarioReporte,
      };
  
      // Crea el Delito en la base de datos
      const delito = await Delito.create(delitoData);
  
      // Ahora, busca el usuario asignado y actualiza el Delito
      const usuarioAsignado = await Usuario.findById(usuarioReporte);
  
      if (usuarioAsignado) {
        delito.usuarioAsignado = usuarioAsignado.rol;
        await delito.save();
      }
  
      res.status(201).json(delito);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
  };
//Consultar Delito
const getDelitos = async (req,res)=>{
    try {
        const delitos = await Delito.find();
        res.status(200).json(delitos);
    } catch (error) {
        res.status(404).json({ msg: 'Error al obtener Delitos' });
    }
}
//Borrar Delito
const borrarDelito = async (req,res)=>{
  try {
    const {id}= req.params
    const delitoBorrado = await Delito.findByIdAndDelete(id);
    res.json(delitoBorrado)
  } catch (error) {
    res.status(404).json({ msg: 'Error al borrar delito' });
  }
}
module.exports= {postDelito,getDelitos,borrarDelito}