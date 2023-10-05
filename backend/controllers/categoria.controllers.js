const CategoriaDelito = require("../models/CategoriaDelitos");

//Post CategoriaDelito
const postCategoriaDelito = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevaCategoria = new CategoriaDelito({
      nombre,
      descripcion,
    });
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
//Get CategoriaDelito
const getCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaDelito.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(404).json({ msg: "Error al obtener Categorias" });
  }
};

//Borrar Categoria

const borrarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriasBorrada = await CategoriaDelito.findByIdAndDelete(id);
    res.json(categoriasBorrada);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Error al borrar Categoria" });
  }
};
//PUT Categoria
const actualizarCategoria = async (req,res)=>{
    const {id}= req.params
    const { nombre, descripcion } = req.body;
    try {
      const categoria = await CategoriaDelito.findById(id);
      if (!categoria) {
        return res.status(404).json({ msg: 'Categoria no encontrada' });
      }
      categoria.nombre = nombre;
      categoria.descripcion = descripcion;
      await categoria.save();
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(404).json({ msg: 'Error al editar Categoia' });
    }
  }

module.exports = { postCategoriaDelito, getCategorias, borrarCategoria,actualizarCategoria };
