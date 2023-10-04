const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
      },
      apellido: {
        type: String,
        required:[true, 'El apellido es requerido']
      },
      correoElectronico: {
        type: String,
        required: [true, 'El correo electronico es requerido'],
        unique: true, // Asegura que el correo electrónico sea único
        lowercase: true, // Almacena el correo electrónico en minúsculas
      },
      contraseña: {
        type: String,
        required: [true, 'La contraseña es requerida']
      },
      rol: {
        type: String,
        required: true,
        //enum: ['administrador', 'usuarioRegular', 'personalSeguridad'], // Define los roles posibles
        default: 'Ciudadano', // Rol por defecto si no se especifica
      },
      ubicacion: {
        type: {
          latitud: Number,
          longitud: Number,
        }, _id: false,
      },  estado :{
        type:Boolean,
        default: true
    }
})
const Usuario = model('Usuario',UsuarioSchema);

module.exports = Usuario;