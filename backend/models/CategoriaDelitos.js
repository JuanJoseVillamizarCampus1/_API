const mongoose = require('mongoose');

const categoriaDelitoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de el delito es requerido'],
    unique: true, 
  },
  descripcion: {
    type: String,
    required: [true, 'La descripcion de el delito es requerida'],
  },
});

const CategoriaDelito = mongoose.model('CategoriaDelito', categoriaDelitoSchema);

module.exports = CategoriaDelito;
