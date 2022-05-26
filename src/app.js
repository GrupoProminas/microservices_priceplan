/* eslint-disable no-console,no-undef*/
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

global.Promise = bluebird.Promise;

// Config
import ApiConfig from './config/api.conf';

// Define environment object
const config = new ApiConfig();
const environment = config.getEnv();

// Core
import Cors from './core/Cors';
import Routers from './core/Routers';
import Database from './core/Database';
import RequestQuery from './core/RequestQuery';
import SSL from './core/SSL';
import Security from './core/Security';
import Response from './core/Response';
import Locales from './core/Locales';
import Validator from './core/Validator';
import LogsManager from './core/LogsManager';
import Routines from './core/Routines';


// Classes & app
const app = express();
const cors = new Cors();
const routers = new Routers();
const database = new Database();
const requestQuery = new RequestQuery();
const ssl = new SSL();
const security = new Security();
const response = new Response();
const locales = new Locales(environment.app.locale);
const validator = new Validator();
const logsManager = new LogsManager(environment);
const routines = new Routines();

process.env.TZ = environment.app.timezone;

process.prependListener('uncaughtException', error => {
    if (config.getEnvName() === 'development') throw error;
    else logsManager.log(error.stack);
});

// Set express app in Response class
response.setApp(app);

/**
 * Setup validator with Joi
 * @private
 */
const _setupValidator = () => {
    // Set locale in validator
    validator.setLocale(locales.locale, locales.getLocaleObject('joi'));
    validator.syncSettings();
};

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
    routers.syncRouters(app);
};

/**
 * Console log output
 * @param text
 * @private
 */
const _appLog = (text) => {
    if (config.getEnvName() !== 'test') {
        console.log(text);
    }
};

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupCors = () => {
    environment.server.cors['x-powered-by'] = environment.app.name;
    cors.setCors(app, environment.server.cors);
};

/**
 * Set databases properties and connect
 * @private
 */
const _setupDatabase = async () => {

    // Define cors headers
    _setupCors();

    // Define validator configs
    _setupValidator();

    await database.setup(environment, locales);

    _appLog('[Databases]\tConnect success!!');

    _setupRouters();
};

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = async () => {

    // Init databases
    await _setupDatabase();

    // Print in console app status
    _appLog(`\n${environment.app.name} on at ${environment.server.host}:${environment.server.port}\n`);

    // Detect if app is running in secure mode and print this
    if (environment.server.secure) {
        _appLog('[SSL_ON]\tSecure');
    } else {
        _appLog('[SSL_OFF]\tNOT SECURE (!)');
    }
};

String.prototype.nfd = function () {
    return this.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z ]/gmi, '');
}

// No use logs in test environment!
if (config.getEnvName() !== 'test') {
    app.use(morgan(config.getEnvName() === 'development' ? 'dev' : 'combined'));
}

const companyChecker = (req, res, next) => {
    const company = process.env.WORKSPACE === 'prominas' ? 'prominas' : req.headers.company;

    if (!company) return res.status(400).send({message: 'Company header is not set, please tell us what company you want to use.'});
    if (!(company in mongoose.companies)) return res.status(400).send({message: `Company "${company}" is not configured, please change the company or implement this company.`});

    req.models = mongoose.companies[company].models;
    req.models.$company = company;

    return next();
};

// Express global usages and middlewares
app.use(bodyParser.json());
app.use(companyChecker);
app.use(requestQuery.parseQuery);
app.use(compression({threshold: 100}));

// Security middlewares with helmet
security.makeSecure(app, environment.server.ssl.hpkpKeys);

// Create secure server or insecure server (see your *.env.js)
const server = environment.server.secure ? ssl.getHTTPSServer(app, environment.server.ssl) : app;

// Listen server
server.listen(environment.server.port, environment.server.host, _listenSuccess);

routines._setupRoutines();

export default app;