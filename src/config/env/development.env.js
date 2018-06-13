module.exports = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'MICROSSERVICE PRICE AND PLANS',
        version : '1.0.0',
        locale : 'pt_BR'
    },


    /**
     * EXPRESS SERVER CONFIGS
     * All configurations for expressJS HTTP Server should gop here
     */
    server: {
        secure  : false,
        host    : '127.0.0.1',
        port    : 3000,
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
    },

    /**
     * APIs CONFIGS
     * All configurations for another apis go here
     */
    apis: {
        apiKey  : '',
        accounts: {
            uri: 'https://api-accounts.institutoprominas.com.br'
        },
        storage : {
            uri   : 'https://api-storage.institutoprominas.com.br',
            bucket: ''
        }
    }
};