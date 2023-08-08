/* eslint-disable quotes */
module.exports = {
  "prominas": {
    "app": {
      "name": "MICROSERVICE PRICEPLAN - PROD MODE",
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
            "host": "erp-lyratec-shard-00-00.dyz6u.mongodb.net",
            "port": 27017
          },
          {
            "host": "erp-lyratec-shard-00-01.dyz6u.mongodb.net",
            "port": 27017
          },
          {
            "host": "erp-lyratec-shard-00-02.dyz6u.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-t55wyk-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "piaget",
        "pass": "LCGOK4lHXFcFD3io",
        "database": "database_piaget",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        poolSize:  3,
        maxPoolSize: 6
      }
    },
    "gateway": {
      "baseUrl": "https://api-gateway.institutoprominas.com.br/"
    },
    "apis": {
      "users": {
        "mode": "direct",
        "baseUrl": "http://10.138.0.6:3000/"
      },
      "students": {
        "mode": "direct",
        "baseUrl": "http://10.138.0.3:3014/"
      }
    }
  },
  "lyraedu": {
    "app": {
      "name": "MICROSERVICE PRICEPLAN - PROD MODE",
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
      // "lytex": {
      //   "servers": [
      //     {
      //       "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
      //       "port": 27017
      //     },
      //     {
      //       "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
      //       "port": 27017
      //     },
      //     {
      //       "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
      //       "port": 27017
      //     }
      //   ],
      //   "replicaSet": "atlas-caf2o9-shard-0",
      //   "authSource": "admin",
      //   "auto_reconnect": true,
      //   "ssl": true,
      //   "user": "lytex",
      //   "pass": "Cu716rVmpQ5Niv6X",
      //   "database": "lytex_erp",
      //   "dialect": "mongodb",
      //   "charset": "utf8",
      //   "logging": false,
      //   poolSize:  1,
      //   maxPoolSize: 2
      // },
      "iteq": {
        "servers": [
          {
            "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "iteq",
        "pass": "OLSSBdFGYp2fLQ3w",
        "database": "iteq_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        poolSize:  1,
        maxPoolSize: 2
      },
      "isafac": {
        'servers': [
          {
            "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
            'port': 27017
          },
          {
            "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
            'port': 27017
          },
          {
            "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
            'port': 27017
          }
        ],
        'replicaSet': 'atlas-caf2o9-shard-0',
        'authSource': 'admin',
        'auto_reconnect': true,
        'ssl': true,
        'user': 'isafac',
        'pass': 'dQaMtkxl6RkpTHlX',
        'database': 'isafac_erp',
        'dialect': 'mongodb',
        'charset': 'utf8',
        'logging': false,
        poolSize:  1,
        maxPoolSize: 2
      },
      "chrispim": {
        "servers": [
          {
            "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "chrispim",
        "pass": "oG77QR4wjlZZzQge",
        "database": "chrispim_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        "poolSize": 1,
        "maxPoolSize": 2
      },
      "certificacao": {
        "servers": [
          {
            "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "certificacao",
        "pass": "9X7qF15ZgWzMv2",
        "database": "certificacao_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        'poolSize': 1,
        'maxPoolSize': 2
      },
      "apresentacao": {
        "servers": [
          {
            "host": "shared-2-shard-00-00-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-01-pri.9s9tp.mongodb.net",
            "port": 27017
          },
          {
            "host": "shared-2-shard-00-02-pri.9s9tp.mongodb.net",
            "port": 27017
          }
        ],
        "replicaSet": "atlas-caf2o9-shard-0",
        "authSource": "admin",
        "auto_reconnect": true,
        "ssl": true,
        "user": "apresentacao",
        "pass": "9jcS1rZU968NQU",
        "database": "apresentacao_erp",
        "dialect": "mongodb",
        "charset": "utf8",
        "logging": false,
        'poolSize': 1,
        'maxPoolSize': 2
      }
    },
    "gateway": {
      "baseUrl": "https://api-gateway-lyraedu.lytex.com.br/"
    },
    "apis": {
      "users": {
        "mode": "direct",
        "baseUrl": "http://10.138.0.6:3000/"
      },
      "students": {
        "mode": "direct",
        "baseUrl": "http://10.138.0.3:3014/"
      }
    }
  }
};
