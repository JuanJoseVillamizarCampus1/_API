const mongoose = require('mongoose');

const denunciaAnonimaSchema = new mongoose.Schema({
  tipoDelito: {
    type: String,
    required: [true, 'El tipo de delito es requerido'],
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
    required: [true, 'La direccion es requerida'],
  },
  comuna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comuna',
    required: true,
  },
  barrio: {
    type: String,
    required: [true, 'El barrio es requerido'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripcion del delito es requerida'],
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
