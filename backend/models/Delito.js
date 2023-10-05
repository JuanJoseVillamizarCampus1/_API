const mongoose = require('mongoose');

// Modelo para Delito
const delitoSchema = new mongoose.Schema({
  tipoDelito: {
    type: String,
    required: [true, 'El tipo de delito es requerida'],
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
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: [true, 'La direccion es requerida'],
  },
  barrio: {
    type: String,
    required: [true, 'El barrio es requerido'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripcion del delito es requerida'],
  },
  estado: {
    type: String,
    enum: ['resuelto', 'en curso', 'archivado'],
    default: 'en curso',
    required:true
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
  evidencias: [
    {
      nombre: String,
      tipo: String,
      archivo: String,
    },
  ],
  testigos: {
    type: Boolean,
    required: false,
  },
  categoriaDelito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoriaDelito',
    required: true,
  },
  comuna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comuna',
    required: true,
  },
  comentarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comentario',
    },
  ],
});

const Delito = mongoose.model('Delito', delitoSchema);
module.exports =Delito