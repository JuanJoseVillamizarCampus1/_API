const mongoose = require('mongoose');

const denunciaAnonimaSchema = new mongoose.Schema({
  tipoDelito: {
    type: String,
    required: true,
  },
  categoriaDelito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoriaDelito',
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ubicacion: {
    type: String, // Cambiar el tipo a String
    required: true,
  },
  direccion: {
    type: String, // Cambiar el tipo a String
    required: true,
  },
  comuna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comuna',
    required: true,
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

const DenunciaAnonima = mongoose.model('DenunciasAnonima', denunciaAnonimaSchema);

module.exports = DenunciaAnonima;
