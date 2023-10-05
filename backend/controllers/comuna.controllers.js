const Comuna = require("../models/Comuna");

//Post Comuna
const postComuna = async (req, res) => {
  try {
    const {nombre,barrios}=req.body
    const comunanueva = new Comuna({nombre,barrios})
   await comunanueva.save()
   res.status(201).json(comunanueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
//Get Comunas
const getComunas = async(req,res)=>{
  try {  //Paginacion
    const page = parseInt(req.query.page) || 1; //pagina de inicio
    const perPage = parseInt(req.query.perPage) || 10; //resultados por pagina
    // Calcular el índice de inicio
    const startIndex = (page - 1) * perPage;
    // Consulta para obtener las comunas paginadas
    const comunas = await Comuna.find()
      .skip(startIndex)
      .limit(perPage);
    // Contar el total de comunas
    const totalComunas = await Comuna.countDocuments();
    const response = {
      comunas,
      pageInfo: {
        PaginaActual: page,
        totalPaginas: Math.ceil(totalComunas / perPage),
        totalComunas: totalComunas,
      },
  } 
  res.status(200).json(response);
}
catch (error) {
  res.status(404).json({ msg: 'Error al obtener Comunas' });
}
}

//DELETE Comunas
const borrarComuna = async (req,res)=>{
  try {
    const {id}= req.params
    const comunaBorrada = await Comuna.findByIdAndDelete(id);
    res.json(comunaBorrada)
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: 'Error al borrar Comuna' });
  }
}
//PUT Comunas
const actualizarComuna = async (req,res)=>{
  const {id}= req.params
  const { nombre, barrios } = req.body;
  try {
    const comuna = await Comuna.findById(id);
    if (!comuna) {
      return res.status(404).json({ msg: 'Comuna no encontrada' });
    }
    comuna.nombre = nombre;
    comuna.barrios = barrios;
    await comuna.save();
    res.json(comuna);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: 'Error al editar Comuna' });
  }
}
module.exports= {postComuna,getComunas,borrarComuna,actualizarComuna}