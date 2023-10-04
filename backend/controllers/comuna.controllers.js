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
  try {
    const comunas = await Comuna.find()
    res.status(200).json(comunas);
  } catch (error) {
    res.status(404).json({ msg: 'Error al obtener Comunas' });
  }
}
module.exports= {postComuna,getComunas}