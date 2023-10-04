const Delito = require('../models/Delito')
const Usuario = require('../models/Usuario')
const CategoriaDelito = require('../models/CategoriaDelitos')
//Agregar Delito
const postDelito = async (req, res) => {
  try {
    const { tipoDelito, descripcion, usuarioReporte, direccion, testigos, comentarios, usuarioAsignado, categoriaDelito,comuna } = req.body;

    // Verificar si el usuario existe
    const usuarioExiste = await Usuario.findById(usuarioReporte);
    if (!usuarioExiste) {
      return res.status(404).json({ msg: 'El usuario no existe.' });
    }

    // URL de la API de Nominatim para geocodificar la dirección
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

    // Realizar una solicitud HTTP GET para geocodificar la dirección
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      const resultado = data[0];
      const ubicacionString = `Latitud:${resultado.lat}, Longitud${resultado.lon}`;

      // Crear el objeto Delito
      const delitoData = {
        tipoDelito,
        descripcion,
        usuarioReporte,
        ubicacion: ubicacionString,
        direccion,
        testigos,
        usuarioAsignado,
        categoriaDelito,
        comuna
      };

      // Buscar el usuario asignado y la categoría de delito
      const [asignado, categoria] = await Promise.all([
        Usuario.findById(usuarioAsignado).select('nombre apellido correoElectronico _id'),
        CategoriaDelito.findById(categoriaDelito),
      ]);

      if (!asignado || !categoria) {
        return res.status(404).json({ msg: 'Usuario asignado o categoría de delito no encontrados.' });
      }

      // Crear el Delito
      const delito = new Delito(delitoData);
      delito.usuarioAsignado = asignado;
      delito.categoriaDelito = categoria;
      delito.categoriaDelito = {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      };

      await delito.save();

      res.status(201).json(delito);
    } else {
      res.status(404).json({ msg: 'Dirección no encontrada' });
    }
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
    console.error(error);
    res.status(404).json({ msg: 'Error al borrar delito' });
  }
}
module.exports= {postDelito,getDelitos,borrarDelito}