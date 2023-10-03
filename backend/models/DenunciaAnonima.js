const mongoose = require('mongoose');

const denunciaAnonimaSchema = new mongoose.Schema({
  delito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delito',
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ubicacion: {
    latitud: Number,
    longitud: Number,
  },
  descripcion: {
    type: String,
    required: true,
  },
  evidencia: {
    type: String,
    required: false,
  },
  testigos: {
    type: Boolean,
    required: false,
  },
  estado: {
    type: String,
    enum: ['en curso', 'archivado'],
    default: 'en curso',
  },
});

const DenunciaAnonima = mongoose.model('DenunciaAnonima', denunciaAnonimaSchema);

module.exports = DenunciaAnonima;
