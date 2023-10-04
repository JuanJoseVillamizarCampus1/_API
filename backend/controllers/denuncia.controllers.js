const DenunciaAnonima = require('../models/DenunciaAnonima');
const CategoriaDelito = require('../models/CategoriaDelitos')
//post denuncia

const postDenuncia= async(req,res)=>{
    try {
        const {tipoDelito,categoriaDelito,direccion,descripcion,testigos,comuna}=req.body

        const apiUrl =`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
        const response = await fetch(apiUrl);
        const data = await response.json()
        if(data.length>0){
            const resultado= data[0];
            const ubicacionString = `Latitud:${resultado.lat}, Longitud:${resultado.lon}`;

        const denunciaData={
            tipoDelito,
            descripcion,
            ubicacion: ubicacionString,
            direccion,
            testigos,
            categoriaDelito,
            comuna
        };
        const categoria = await CategoriaDelito.findById(categoriaDelito)
        if(!categoria){
            return  res.status(404).json({ msg: 'categoría de delito no encontrada.' })
        }
        const denuncia = new DenunciaAnonima(denunciaData);
        denuncia.categoriaDelito= categoria;
        denuncia.categoriaDelito= {
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
        }
        await denuncia.save()
        res.status(201).json(denuncia);
        }
        else {
            res.status(404).json({ msg: 'Dirección no encontrada' });
          }
    } catch (error) {
        console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
    }
    
};

module.exports= {postDenuncia}