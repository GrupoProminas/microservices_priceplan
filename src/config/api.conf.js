/**
 *  - This class load environment object using system env variable exported
 * the object is set in 'this.env' and should be used in many application steps
 *
 *  - The environment object should be exported in .env.js file in './env' directory
 */
export default class ApiConfig {

    constructor() {
        this._loadEnvironment();
    }

    /**
     * Load the environment file using system env variable
     * @private
     */
    _loadEnvironment() {
        this.envname = process.env.NODE_ENV;
        this.env = require('./env/' + this.envname + '.env.js');
    }

    /**
     * Return the loaded environment / config
     * @returns {any | *}
     */
    getEnv() {
        const env = this.env[process.env.WORKSPACE];

        if (process.env.NODE_ENV === 'development' || Object.keys(env.databases).length === 0) return env;

        return Object.assign({}, env, {
            apis: process.apis
        });
    }

    getEnvName() {
        return this.envname;
    }
}