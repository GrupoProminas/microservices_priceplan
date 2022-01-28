#!/usr/bin/env bash
set -e
clear

#variaveis
OS=`uname`
project=$PWD
repository="$project/.base"
messages=''

#cores
WAR='\033[1;33m'
DAN='\033[1;31m'
SUC='\033[0;32m'
COD='\033[0;36m'
NC='\033[0m'

#deleta versoes antigas da base se houver
[ ! -d ${repository} ] || rm -rf ${repository}

#clona repositorio base
echo '\nClonando repositório...\n'
git clone https://github.com/institutoprominas/microservices_base_api ${repository} --quiet

#preciso me atualizar primeiro :D
if ! cmp --silent ${repository}/update.sh ${project}/update.sh; then
  cp ${repository}/update.sh ${project}
  sh update.sh
  exit
fi

#copia arquivos do core
echo '\nCopiando arquivos...'

[ -d ${project}/src/routines ] || mkdir ${project}/src/routines

cp -r ${repository}/.gitignore ${project}/.gitignore
cp -r ${repository}/.babelrc ${project}/.babelrc
cp -r ${repository}/.dockerignore ${project}/.dockerignore
cp -r ${repository}/.eslintignore ${project}/.eslintignore
cp -r ${repository}/.eslintrc.js ${project}/.eslintrc.js

rm -rf ${project}/src/core/*
cp -r ${repository}/src/core/* ${project}/src/core

rm ${project}/src/app.js
cp ${repository}/src/app.js ${project}/src/app.js

rm ${project}/src/config/api.conf.js
cp ${repository}/src/config/api.conf.js ${project}/src/config/api.conf.js

[ -d ${project}/src/config/env ] || mkdir ${project}/src/config/env

cp ${repository}/src/config/env/homologation.env.js ${project}/src/config/env/sample-homologation.env.js
cp ${repository}/src/config/env/production.env.js ${project}/src/config/env/sample-production.env.js

[ -d ${project}/logs ] || mkdir ${project}/logs

cp ${repository}/logs/.gitignore ${project}/logs/.gitignore

rm -rf ${project}/logs/.gitignore
cp -r ${repository}/logs/.gitignore ${project}/logs/.gitignore

rm -rf ${project}/src/config/joi/*
cp -r ${repository}/src/config/joi/* ${project}/src/config/joi

rm -rf ${project}/src/config/mongoose/*
cp -r ${repository}/src/config/mongoose/* ${project}/src/config/mongoose

rm -rf ${project}/src/config/sequelize/*
cp -r ${repository}/src/config/sequelize/* ${project}/src/config/sequelize

if [ -f ${project}/src/services/Service.js ]; then
  rm ${project}/src/services/Service.js
fi

if [ -f ${project}/src/services/ACLVerify.service.js ]; then
  rm ${project}/src/services/ACLVerify.service.js
fi

if [ -f ${project}/src/services/Example.service.js ]; then
  rm ${project}/src/services/Example.service.js
fi

cp -r ${repository}/src/services/* ${project}/src/services

rm -rf ${project}/src/storage/locales/*
cp -r ${repository}/src/storage/locales/* ${project}/src/storage/locales

#pacotes

if ! grep -q -i 'nodemailer' ${project}/package.json; then
  npm install --save nodemailer
fi

if ! grep -q -i 'node-cron' ${project}/package.json; then
  npm install --save node-cron
fi

if ! grep -q -i 'bluebird' ${project}/package.json; then
  npm install --save bluebird
fi

if ! grep -q -i '"update"' ${project}/package.json; then
 if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"scripts": {/"scripts": {"update": "sh update.sh",/' ${project}/package.json
 else
  sed -i'' -e 's/"scripts": {/"scripts": {"update": "sh update.sh",/' ${project}/package.json
 fi
fi

if ! grep -q -i '"mongoose": "^5.3.13"' ${project}/package.json; then
  npm remove mongoose && npm install --save mongoose@5.3.13
fi

if [ "$OS" == 'Darwin' ]; then
  sed -i '' 's/"reatrt"/"restart"/g' ${project}/package.json
  sed -i '' 's/"watch       : true"/"watch       : false"/g' ${project}/pm2*.yml
 else
  sed -i'' -e 's/"reatrt"/"restart"/g' ${project}/package.json
  sed -i'' -e 's/"watch       : true"/"watch       : false"/g' ${project}/pm2*.yml
fi

#atualiza pacotes
echo 'Atualizando pacotes...\n'
npm update -s && npm install -s

#scripts node
cp -r ${repository}/update-scripts ${project}

node ${project}/update-scripts/package.json.js
node ${project}/update-scripts/pm2-deploy.js
node ${project}/update-scripts/env.js

#deleta a pasta do repositorio
rm -rf ${repository}

#deleta a pasta dos scripts
rm -rf ${project}/update-scripts

#finaliza atualizacao

if [ -z "$messages" ]; then
  echo "\n${SUC}Atualizado com sucesso!${NC}\n"
else
  echo ${messages}
fi
