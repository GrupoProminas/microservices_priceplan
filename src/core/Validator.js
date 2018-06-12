import 'joi-i18n';
import Joi               from 'joi';
import {defaultSettings} from '../config/joi/joi.conf';

export default class Validator {

    constructor() {}


    /**
     * Define validator locale for translate
     * @param locale
     * @param localeObject
     */
    setLocale(locale, localeObject) {

        // Add locale support
        Joi.addLocaleData(locale, localeObject);

        // Set locale
        this.locale = locale;
    }


    /**
     * Synchronize default configurations to Joi validate methods
     */
    syncSettings() {

        // Apply settings your methods
        defaultSettings.forEach(defaultSetting => {
            defaultSetting.applyTo.forEach(method => {
                Joi[method]()._settings = defaultSetting.settings;
                Joi[method]()._settings.locale = this.locale
            });
        });
    }

}