const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.recipesPath = '/api/recipes';

        //DB Connection
        this.DBConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async DBConnect(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        // const corsOptions = {
        //     "origin": "*",
        //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        //     "preflightContinue": false,
        //     "optionsSuccessStatus": 204
        //   }
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico para hosting
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.recipesPath, require('../routes/recipes'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Server on port: ', this.port );
        });        
    }
}

module.exports = Server;