const cors = require('cors');
const dbConnection = require('../database/config');
const express = require('express')

class Server {
    constructor(){
    this.app= express()
    this.port = process.env.PORT
    this.middlewares();
    this.connetionDb();
    this.path={
        usuarios: '/api/usuarios',
        roles: '/api/roles',
        delitos:'/api/delitos',
        comunas:'/api/comunas',
        categoriaD:'/api/categoriasDelitos',
        denunciaAnonima:'/api/denunciaAnonima'
    }
    this.routes()
    }
    async connetionDb (){
        await dbConnection()
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.path.usuarios,require('../routes/usuarios.routes'));
        this.app.use(this.path.roles,require('../routes/role.routes'));
        this.app.use(this.path.delitos,require('../routes/delitos.routes'));
        this.app.use(this.path.comunas,require('../routes/comunas.routes'));
        this.app.use(this.path.categoriaD,require('../routes/categoriasDelitos.routes'));
        this.app.use(this.path.denunciaAnonima,require('../routes/denuncia.routes'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Listo el servidor mi rey escuhando el puerto: ${this.port}`);
        })
}
}

module.exports = Server;