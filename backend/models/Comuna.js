const mongoose = require('mongoose');

const comunaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la comuna es requerida'],
  },
  barrios: [{
    type: String,
    required: true,
  }],
});

const Comuna = mongoose.model('Comuna', comunaSchema);

module.exports = Comuna;



