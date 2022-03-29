/* eslint-disable quotes */
module.exports = {
  "prominas": {
    "app": {
      "name": "MICROSERVICE PRICEPLAN - HOMO MODE",
      "version": "1.0.0",
      "locale": "pt_BR",
      "timezone": "America/Sao_Paulo",
      "adminEmail": "desenvolvimento@lytex.com.br",
      "sendEmailErrors": false
    },
    "mail": {
      "host": "smtplw.com.br",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "Prominassigesp",
        "pass": "zJfFMHdg8398"
      },
      "sender": "no-reply@lytex.com.br"
    },
    "server": {
      "secure": false,
      "host": "0.0.0.0",
      "port": 3003,
      "cors": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Company"
      },
      "ssl": {
        "privateKey": "",
        "certificate": "",
        "hpkpKeys": []
      }
    },
    "databases": {
      "prominas": {
        "servers": [
          {
            "host": "erp-homologation2-shard-00-00.cm4wf.mongodb.net",
            "port": 27017
          },
          {
            "host": "erp-homologation2-shard-00-01.cm4wf.mongodb.net",
            "port": 27017
          },
          {
            "host": "erp-homologation2-shard-00-02.cm4wf.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-h1jpc3-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "user-admin",
        "pass": "sRAezX1laYL2lWWc",
        "database": "database_piaget",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false
      }
    },
    "gateway": {
      "baseUrl": "https://api-gateway.institutoprominas.com.br/"
    },
    "apis": {
      "users": {
        "mode": "direct",
        "baseUrl": "http://127.0.0.1:3000/"
      },
      "students": {
        "mode": "direct",
        "baseUrl": "http://localhost:3014/"
      }
    }
  },
  "lyraedu": {
    "app": {
      "name": "MICROSERVICE PRICEPLAN - HOMO MODE",
      "version": "1.0.0",
      "locale": "pt_BR",
      "timezone": "America/Sao_Paulo",
      "adminEmail": "desenvolvimento@lytex.com.br",
      "sendEmailErrors": false
    },
    "mail": {
      "host": "smtplw.com.br",
      "port": 465,
      "secure": true,
      "auth": {
        "user": "Prominassigesp",
        "pass": "zJfFMHdg8398"
      },
      "sender": "no-reply@lytex.com.br"
    },
    "server": {
      "secure": false,
      "host": "0.0.0.0",
      "port": 3003,
      "cors": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Company"
      },
      "ssl": {
        "privateKey": "",
        "certificate": "",
        "hpkpKeys": []
      }
    },
    "databases": {
      "lytex": {
        "servers": [
          {
            "host": "shared-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "iteq",
        "pass": "OLSSBdFGYp2fLQ3w",
        "database": "lytex_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false
      }
    },
    "gateway": {
      "baseUrl": "https://api-gateway-lyraedu.lytex.com.br/"
    },
    "apis": {
      "users": {
        "mode": "direct",
        "baseUrl": "http://127.0.0.1:3000/"
      },
      "students": {
        "mode": "direct",
        "baseUrl": "http://localhost:3014/"
      }
    }
  }
};