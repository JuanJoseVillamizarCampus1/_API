const Delito = require('../models/Delito')
const Usuario = require('../models/Usuario')
const CategoriaDelito = require('../models/CategoriaDelitos')
const Comuna = require('../models/Comuna')
//Agregar Delito
const postDelito = async (req, res) => {
  try {
    const { tipoDelito, descripcion, usuarioReporte, direccion, testigos, comentarios, categoriaDelito,comuna,barrio } = req.body;

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
        categoriaDelito,
        comuna,
        barrio
      };

      // Buscar el usuario asignado y la categoría de delito
      const categoria = await CategoriaDelito.findById(categoriaDelito);
      if (!categoria) {
        return res
          .status(404)
          .json({ msg: "categoría de delito no encontrada." });
      }

      // Crear el Delito
      const delito = new Delito(delitoData)
      delito.categoriaDelito = categoria;
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
//-----------------------------------------------------------------------------//
//Consultar Delitos archivados
const getDelitosAarchivados = async (req,res)=>{
  try {
    //Paginacion
    const page = parseInt(req.query.page) || 1; //pagina de inicio
    const perPage = parseInt(req.query.perPage) || 10; //resultados por pagina
    // Calcular el índice de inicio
    const startIndex = (page - 1) * perPage;
    // Consulta para obtener las denuncias anónimas paginadas
    const delitos = await Delito.find({estado:'archivado'})
      .populate("categoriaDelito")
      .populate("comuna","nombre")
      .skip(startIndex)
      .limit(perPage);
    // Contar el total de denuncias anónimas
    const totalDelitos = await Delito.countDocuments();
    const response = {
      delitos,
      pageInfo: {
        PaginaActual: page,
        totalPaginas: Math.ceil(totalDelitos / perPage),
        totalDelitos: totalDelitos,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener denuncias anonimas" });
  }
}
//-----------------------------------------------------------------------------//
//Consultar Delitos activos
const getDelitos = async (req,res)=>{
  try {
    //Paginacion
    const page = parseInt(req.query.page) || 1; //pagina de inicio
    const perPage = parseInt(req.query.perPage) || 10; //resultados por pagina
    // Calcular el índice de inicio
    const startIndex = (page - 1) * perPage;
    // Consulta para obtener las denuncias anónimas paginadas
    const delitos = await Delito.find({estado:'en curso'})
      .populate("categoriaDelito")
      .populate("comuna","nombre")
      .skip(startIndex)
      .limit(perPage);
    // Contar el total de denuncias anónimas
    const totalDelitos = await Delito.countDocuments();
    const response = {
      delitos,
      pageInfo: {
        PaginaActual: page,
        totalPaginas: Math.ceil(totalDelitos / perPage),
        totalDelitos: totalDelitos,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener denuncias anonimas" });
  }
}
//-----------------------------------------------------------------------------//
//Consultar TODOS LOS DELITOS
const getAllDelitos = async (req,res)=>{
  try {
    //Paginacion
    const page = parseInt(req.query.page) || 1; //pagina de inicio
    const perPage = parseInt(req.query.perPage) || 10; //resultados por pagina
    // Calcular el índice de inicio
    const startIndex = (page - 1) * perPage;
    // Consulta para obtener las denuncias anónimas paginadas
    const delitos = await Delito.find()
      .populate("categoriaDelito")
      .skip(startIndex)
      .limit(perPage);
    // Contar el total de denuncias anónimas
    const totalDelitos = await Delito.countDocuments();
    const response = {
      delitos,
      pageInfo: {
        PaginaActual: page,
        totalPaginas: Math.ceil(totalDelitos / perPage),
        totalDelitos: totalDelitos,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener denuncias anonimas" });
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
module.exports= {postDelito,getDelitos,borrarDelito,getAllDelitos,getDelitosAarchivados}