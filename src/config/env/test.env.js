module.exports = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'Base - TEST MODE',
        version : '2.0.0'
    },


    /**
     * EXPRESS SERVER CONFIGS
     * All configurations for expressJS HTTP Server should gop here
     */
    server: {
        secure  : false,
        host    : '127.0.0.1',
        port    : 3002,
        cors    : {
            'Access-Control-Allow-Origin'   : '*',
            'Access-Control-Allow-Methods'  : 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        ssl: {
            // SSL Private Key path
            privateKey  : 'PATH/TO/YOU/CERT_KEY',

            // SSL Certificate path
            certificate : 'PATH/TO/YOU/CERT',

            // Key HPKP
            hpkpKeys    : []
        }
    },


    /**
     * DATABASES CONFIG
     * All configurations to connect in databases should go here
     */
    databases: {
        mongo: {
            servers: [
                {
                    host: 'localhost',
                    port: 27017
                },
                // ...
            ],
            replicaSet  : '',
            authSource  : 'admin',
            ssl         : false,
            user        : 'root',
            pass        : 'root',
            name        : 'microservice-price-and-plans',
            dialect     : 'mongodb',
            charset     : 'utf8',
            logging     : true,
            enabled     : true,
            configWith  : 'mongoose'
        },
    }
};