const mongoose = require('mongoose');

const ubicacionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  comuna: {
    type: String,
    required: true,
  },
  barrio: {
    type: String,
    required: true,
  },
  coordenadas: {
    latitud: {
      type: Number,
      required: true,
    },
    longitud: {
      type: Number,
      required: true,
    },
  },
  descripcion: {
    type: String,
    required: false,
  },
});

const Ubicacion = mongoose.model('Ubicacion', ubicacionSchema);

module.exports = Ubicacion;
