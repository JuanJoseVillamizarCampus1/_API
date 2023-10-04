const mongoose = require('mongoose');

const categoriaDelitoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, 
  },
  descripcion: {
    type: String,
    required: true,
  },
});

const CategoriaDelito = mongoose.model('CategoriaDelito', categoriaDelitoSchema);

module.exports = CategoriaDelito;
