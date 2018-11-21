/* eslint-disable camelcase */
module.exports = {

    app: {
        name            : 'MICROSERVICE PRICEPLAN - HOMO MODE',
        version         : '1.0.0',
        locale          : 'pt_BR',
        timezone        : 'America/Sao_Paulo',
        adminEmail      : 'desenvolvimento@ucamprominas.com.br',
        sendEmailErrors : true
    },

    mail: {
        host: 'smtplw.com.br',
        port: 465,
        secure: true,
        auth: {
            user: 'Prominassigesp',
            pass: 'zJfFMHdg8398'
        },
        sender: 'no-reply@ucamprominas.com.br'
    },

    server: {
        secure: false,
        host  : '10.138.0.3',
        port  : 3020,
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
        microservice_name: {
            servers: [
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

    gateway: 'http://localhost/',

    apis: {
        users: {
            mode   : 'direct',
            baseUrl: 'http://10.138.0.6:3000/'
        }
    }
};