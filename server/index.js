const config = require('../common/config/env');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const serverIp = require('./serverIp')();
const findPort = require('find-port');
const i18n = require('i18n-express');
const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const path = require('path');

module.exports = {
    appStart: (app, configs, entry) => {
        app.use(express.static(path.join(__dirname, configs.path)));

        app.engine('.html', require('ejs').__express);
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, configs.viewPath, 'post'));

        app.use(cookieParser());

        app.use(session({ secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false ,
            cookie: { maxAge: 999999,secure: false,httpOnly: true }
        }));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(i18n({
            translationsPath: path.join(__dirname, '..', 'common', 'i18n', 'locales'),
            siteLangs: ['en'],
            browserEnable: false,
            defaultLang: process.env.LNG || 'en'
        }));

        app.use('/', router);

        if (entry) {
            require(config.endpoints)(router);

            app.listen(config.port, () => {
                console.log(chalk.green('Access server from : '));
                for (let i in serverIp) {
                    console.log(chalk.green(' http://' + serverIp[i] + ':' + config.port))
                }
                console.log('Express server listening on port ', config.port);
            });
        }
    }
};
