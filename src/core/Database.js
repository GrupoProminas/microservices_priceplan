/* eslint-disable no-console,multiline-ternary */
import mongoose from 'mongoose';
import {
    defaultMongooseOptions,
    defaultSchemaOptions
} from '../config/mongoose/mongoose.conf';
import fs from 'fs';
import path from 'path';
import paginate from './Paginate';
import beautifyUnique from 'mongoose-beautiful-unique-validation';
import bluebird from "bluebird";

/**
 * Use this class for all methods that manage databases connections, MySQL, PGSql, MongoDB etc..
 */
export default class Database {

    async setup(env, locales) {
        this.setMongooseLocale(locales.getLocaleObject('mongoose'));

        // Use promises
        mongoose.Promise = bluebird.Promise;

        // Inject paginate function in mongoose
        mongoose.Model.paginate = paginate.mongoose;

        // Use plugin Beautify Unique in mongoose (for parse mongodb unique errors)
        mongoose.plugin(beautifyUnique);

        // Set mongoose default options
        Object.keys(defaultMongooseOptions).forEach(key => {
            mongoose.set(key, defaultMongooseOptions[key]);
        });

        mongoose.companies = {};

        // Connect to databases
        Object.keys(env.databases).forEach(companyDbName => {
            mongoose.companies[companyDbName] = this.connectMongo(companyDbName, env.databases[companyDbName]);
        });

        if (Object.values(mongoose.companies).length > 0) {
            const connection = Object.values(mongoose.companies)[0];

            const apis = {};

            const allApisQuery = await connection.collection('Apis').find();
            const allApis = await allApisQuery.toArray();

            allApis.forEach(_api => {
                apis[_api.alias] = {
                    mode: 'direct',
                    baseUrl: `${_api.baseUrl}/`
                };
            });

            process.apis = apis;
        }
    }

    connectMongo(company, databaseConfig) {

        // Return mongo connection
        const connection = mongoose.createConnection(this._createMongooseUri(databaseConfig), {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            poolSize: databaseConfig.poolSize || 1,
            maxPoolSize: databaseConfig.maxPoolSize || (databaseConfig.poolSize ? (databaseConfig.poolSize + 1) : 2)
        });

        // Synchronize models in dir to mongoose
        fs.readdirSync(path.join(__dirname, '../models/mongodb'))
            .forEach(filename => {
                // Define path for model script
                const schemaDef = require(path.join(__dirname, '../models/mongodb', filename)).default;

                // Set schema name
                defaultSchemaOptions.collection = schemaDef.collection;

                // Set schema options
                schemaDef.options = 'options' in schemaDef
                    ? Object.assign(defaultSchemaOptions, schemaDef.options) : defaultSchemaOptions;

                // Create schema
                const schema = new mongoose.Schema(schemaDef.fields, schemaDef.options);

                // Register pre hooks
                if ('pre' in schemaDef)
                    Object.keys(schemaDef.pre).forEach(hook => {
                        if (Array.isArray(schemaDef.pre[hook]))
                            schemaDef.pre[hook].forEach(hookFunction => schema.pre(hook, hookFunction));
                        else schema.pre(hook, schemaDef.pre[hook]);
                    });

                // Register post hooks
                if ('post' in schemaDef)
                    Object.keys(schemaDef.post).forEach(hook => {
                        if (Array.isArray(schemaDef.post[hook]))
                            schemaDef.post[hook].forEach(hookFunction => schema.post(hook, hookFunction));
                        else schema.post(hook, schemaDef.post[hook]);
                    });

                // Register schema indexes
                if ('indexes' in schemaDef)
                    Object.keys(schemaDef.indexes).forEach(index => {
                        schema.index(schemaDef.indexes[index].fields, schemaDef.indexes[index].options);
                    });

                // Register virtuals
                if ('virtual' in schemaDef)
                    Object.keys(schemaDef.virtual).forEach(name => {
                        schema.virtual(name).get(schemaDef.virtual[name]);
                    });

                schema.set('toJSON', {virtuals: true});

                connection.model(schemaDef.collection, schema);
            });

        return connection;
    }

    /**
     * Create a connection URI for mongoose, using cluster or not
     * @param config
     * @private
     */
    _createMongooseUri(config) {

        const authSource = config.authSource ? '&authSource=' + config.authSource : '';
        const replicaSet = config.replicaSet ? '&replicaSet=' + config.replicaSet : '';
        const options = `ssl=${config.ssl}${authSource}${replicaSet}`;

        let servers = '';

        config.servers.forEach((server, key) =>
            servers += `${server.host}:${server.port}${key === config.servers.length - 1 ? '' : ','}`
        );

        return 'user' in config
            ? `mongodb://${encodeURIComponent(config.user)}:${encodeURIComponent(config.pass)}@${servers}/${config.database}?${options}`
            : `mongodb://${servers}/${config.database}?${options}`;
    }

    setMongooseLocale(localeObject) {
        mongoose.Error.messages = localeObject;
    }
}
