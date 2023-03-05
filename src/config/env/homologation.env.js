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
            "host": "erp-lyratec-homologatio-shard-00-00.cm4wf.mongodb.net:27017",
            "port": 27017
          },
          {
            "host": "erp-lyratec-homologatio-shard-00-01.cm4wf.mongodb.net:27017",
            "port": 27017
          },
          {
            "host": "erp-lyratec-homologatio-shard-00-02.cm4wf.mongodb.net:27017",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-tnyjey-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "homologation",
        "pass": "88D1AvR0bYV0G61Q",
        "database": "database_piaget",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false
      }
    },
    "gateway": {
      "baseUrl": "https://homo-api-gateway.institutoprominas.com.br/"
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
      "chrispim": {
        "servers": [
          {
            "host": "shared-homologation-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "shared-homo",
        "pass": "4zsY0GB88qW7vmGK",
        "database": "chrispim_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        "poolSize": 1,
        "maxPoolSize": 2
      },
      "iteq": {
        "servers": [
          {
            "host": "shared-homologation-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "shared-homo",
        "pass": "4zsY0GB88qW7vmGK",
        "database": "iteq_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        "poolSize": 1,
        "maxPoolSize": 2
      },
      "isafac": {
        "servers": [
          {
            "host": "shared-homologation-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-homologation-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "shared-homo",
        "pass": "4zsY0GB88qW7vmGK",
        "database": "isafac_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        "poolSize": 1,
        "maxPoolSize": 2
      },
    },
    "gateway": {
      "baseUrl": "https://api-gateway.lyraedu.com.br/"
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
