module.exports = {


    /**
     * APPLICATION CONFIGS
     * All configurations for express App instance
     */
    app: {
        name    : 'microservice_priceplan',
        version : '2.0.0',
        locale  : 'pt_BR'
    },


    /**
     * EXPRESS SERVER CONFIGS
     * All configurations for expressJS HTTP Server should gop here
     */
    server: {
        secure  : false,
        host    : '127.0.0.1',
        port    : 3001,
        cors    : {
            'Access-Control-Allow-Origin'   : '*',
            'Access-Control-Allow-Methods'  : 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'  : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        ssl: {
            // SSL Private Key path
            privateKey  : '',

            // SSL Certificate path
            certificate : '',

            // Key HPKP
            hpkpKeys    : []
        }
    },


    /**
     * DATABASES CONFIG
     * All configurations to connect in databases should go here
     */
    databases: {

        MongoDBAtlas: {
            servers       : [
                {
                    host: 'homologacao-shard-00-00-dyz6u.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'homologacao-shard-00-01-dyz6u.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'homologacao-shard-00-02-dyz6u.gcp.mongodb.net',
                    port: 27017
                }
            ],
            replicaSet    : 'homologacao-shard-0',
            authSource    : 'admin',
            auto_reconnect: true,
            ssl           : true,
            user          : 'homologacao',
            pass          : '0LXpkVYwis8fH65J',
            name          : 'microservice_priceplan',
            dialect       : 'mongodb',
            charset       : 'utf8',
            logging       : false,
            enabled       : true,
            configWith    : 'mongoose'
        }
    },

    /**
     * APIs CONFIGS
     * All configurations for another apis go here
     */
    apis: {
        apiKey: '',
        accounts: {
            uri: 'https://api-accounts.institutoprominas.com.br'
        },
        storage: {
            uri: 'https://api-storage.institutoprominas.com.br',
            bucket: ''
        }
    }
};