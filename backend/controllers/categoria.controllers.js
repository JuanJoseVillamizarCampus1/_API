const CategoriaDelito = require('../models/CategoriaDelitos');

//Post CategoriaDelito
const postCategoriaDelito = async (req,res)=>{
    try {
        const {nombre,descripcion}=req.body;

        const nuevaCategoria = new CategoriaDelito({
            nombre,
            descripcion
        })
        await nuevaCategoria.save()
        res.status(201).json(nuevaCategoria)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }    
    }
    //Get CategoriaDelito
    const getCategorias= async (req,res)=>{
        try {
            const categorias = await CategoriaDelito.find()
            res.status(200).json(categorias)
        } catch (error) {
            res.status(404).json({ msg: 'Error al obtener Categorias' });
        }
    }

    module.exports={postCategoriaDelito,getCategorias}
   
