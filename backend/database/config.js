const mongoose = require('mongoose')

 const dbConnection = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        console.log('Conectado exitosamente a la base de datos');
    } catch (error) {
        console.error('Error al conectarse a la base de datos:', error);
        throw error;
    }
}
module.exports = dbConnection;