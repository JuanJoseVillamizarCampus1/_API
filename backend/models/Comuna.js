const mongoose = require('mongoose');

const comunaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  barrios: [{
    type: String,
    required: true,
  }],
});

const Comuna = mongoose.model('Comuna', comunaSchema);

module.exports = Comuna;



