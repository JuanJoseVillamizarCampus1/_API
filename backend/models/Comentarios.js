const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo de Usuario
    required: true,
  },
  delito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delito', // Referencia al modelo de Delito
    required: true,
  },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
