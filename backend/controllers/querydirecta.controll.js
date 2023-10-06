const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);

// Función que obtiene la colección
async function getCollection(collectionName) {
  try {
    await client.connect();
    const database = client.db('Delitos');
    const collection = database.collection(collectionName);
    return collection;
  } catch (error) {
    console.error('Error al obtener la colección:', error);
  }
}

// GET BARRIOS por ID de Comuna
async function obtenerBarriosPorIdComuna(req, res) {
    try {
      const id = req.params._id;  
      // Crea una instancia de ObjectId a partir del ID proporcionado
      const objectId = new ObjectId(id);
  
      const collection = await getCollection('comunas');
      const documento = await collection.findOne({ _id: objectId });
  
      if (!documento) {
        console.log('Comuna no encontrada');
        return res.status(404).json({ msg: 'Comuna no encontrada' });
      }
  
      const barrios = documento.barrios || [];
      res.json(barrios);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
  }
module.exports = {
  obtenerBarriosPorIdComuna,
};
