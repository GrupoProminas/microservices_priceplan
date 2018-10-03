/* eslint-disable camelcase */
module.exports = {

    app: {
        name    : 'MICROSERVICE PRICEPLAN - PROD MODE',
        version : '1.0.0',
        locale  : 'pt_BR',
        timezone: 'America/Sao_Paulo'
    },

    server: {
        secure: false,
        host  : '10.138.0.3',
        port  : 3012,
        cors  : {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        ssl   : {
            privateKey : '',
            certificate: '',
            hpkpKeys   : []
        }
    },

    databases: {
        microservice_priceplan: {
            servers       : [
                {
                    host: 'erp-geral1-shard-00-00-dyz6u.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'erp-geral1-shard-00-01-dyz6u.gcp.mongodb.net',
                    port: 27017
                },
                {
                    host: 'erp-geral1-shard-00-02-dyz6u.gcp.mongodb.net',
                    port: 27017
                }
            ],
            replicaSet    : 'erp-geral1-shard-0',
            authSource    : 'admin',
            auto_reconnect: true,
            ssl           : true,
            user          : 'microservice_priceplan',
            pass          : 'vNkTHtI7lweH5Mun',
            name          : 'microservice_priceplan',
            dialect       : 'mongodb',
            charset       : 'utf8',
            logging       : false,
            enabled       : true,
            configWith    : 'mongoose'
        }
    },

    gateway: 'http://localhost/',

    apis: {
        users: {
            mode   : 'direct',
            baseUrl: 'http://10.138.0.6:3000/'
        }
    }
};