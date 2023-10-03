const mongoose =require('mongoose')

const evidenciaSchema = new mongoose.Schema({
    nombreArchivo: {
        type: String,
        required: true,
      },
      tipoArchivo: {
        type: String,
        required: true,
      },
      datos: {
        type: Buffer,
        required: true,
      },
})
const Evidencia = mongoose.model('Evidencia',evidenciaSchema);

module.exports = {Evidencia}