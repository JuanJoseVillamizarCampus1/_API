const DenunciaAnonima = require("../models/DenunciaAnonima");
const CategoriaDelito = require("../models/CategoriaDelitos");

//POST DENUNCIA
const postDenuncia = async (req, res) => {
  try {
    const {
      tipoDelito,
      categoriaDelito,
      direccion,
      descripcion,
      testigos,
      comuna,
    } = req.body;

    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      direccion
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.length > 0) {
      const resultado = data[0];
      const ubicacionString = `Latitud:${resultado.lat}, Longitud:${resultado.lon}`;
      const denunciaData = {
        tipoDelito,
        descripcion,
        ubicacion: ubicacionString,
        direccion,
        testigos,
        categoriaDelito,
        comuna,
      };
      const categoria = await CategoriaDelito.findById(categoriaDelito);
      if (!categoria) {
        return res
          .status(404)
          .json({ msg: "categoría de delito no encontrada." });
      }
      const denuncia = new DenunciaAnonima(denunciaData);
      denuncia.categoriaDelito = categoria;
      await denuncia.save();
      res.status(201).json(denuncia);
    } else {
      res.status(404).json({ msg: "Dirección no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
//-------------------------------------------------------------------//
//GET DENUNCIAS
const getDenunciasAnonimas = async (req, res) => {
  try {
    //Paginacion
    const page = parseInt(req.query.page) || 1; //pagina de inicio
    const perPage = parseInt(req.query.perPage) || 10; //resultados por pagina
    // Calcular el índice de inicio
    const startIndex = (page - 1) * perPage;
    // Consulta para obtener las denuncias anónimas paginadas
    const denuncias = await DenunciaAnonima.find({estado:'en curso'})
      .populate("categoriaDelito")
      .skip(startIndex)
      .limit(perPage);
    // Contar el total de denuncias anónimas
    const totalDenuncias = await DenunciaAnonima.countDocuments();
    const response = {
      denuncias,
      pageInfo: {
        PaginaActual: page,
        totalPaginas: Math.ceil(totalDenuncias / perPage),
        totalDenuncias: totalDenuncias,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener denuncias anonimas" });
  }
};
//-------------------------------------------------------------------//
//DELETE DENUNCIA
const deletedenuncia= async(req,res)=>{
    try {
        const {id}= req.params
        const denuncia = await DenunciaAnonima.findByIdAndUpdate(id,{estado:'archivado'})
        res.status(200).json(denuncia)
    } catch (error) {
        res.status(404).json({ msg: "Error al borra denuncia anonima" });
    }
   
}
module.exports = { postDenuncia, getDenunciasAnonimas,deletedenuncia };
