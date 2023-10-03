const mongoose = require('mongoose');

const delitoSchema = new mongoose.Schema({
  tipoDelito: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ubicacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ubicacion',
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['resuelto', 'en curso', 'archivado'],
    default: 'en curso',
  },
  usuarioReporte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  usuarioAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  evidencias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evidencia' }],
  testigos: {
    type: Boolean,
    required: false,
  },
});

const Delito = mongoose.model('Delito', delitoSchema);

module.exports = Delito;
