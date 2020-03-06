'use strict';

const Hapi = require('@hapi/hapi');
const Plugin = require('./plugin');

const helpers = require('./routes/helpers');
const apiAliases = require('./routes/api/aliases');
const apiStatus = require('./routes/api/Status');
const apiRedirect = require('./routes/api/redirect');
const webShorten = require('./routes/web/shorten');
const webStatus = require('./routes/web/status');

const Server = {};

/**
 * TODO:
 * - unit && e2e testing
 */

Server.start = async (config) => {
  try {
    const port = process.env.PORT || config.port;
    const host = process.env.HOST || config.host;
    Server._instance = new Hapi.Server({
      port: port,
      host: host
    });

    await Server._instance.route(helpers);

    await apiAliases.init(Server._instance, config);
    await apiStatus.init(Server._instance, config);
    await apiRedirect.init(Server._instance, config);
    await webShorten.init(Server._instance, config);
    await webStatus.init(Server._instance, config);

    await Server._instance.register(Plugin);
    await Server._instance.views({
      engines: {
        html: require('handlebars')
      },
      relativeTo: __dirname,
      path: 'templates',
      layout: true,
      layoutPath: 'templates/layout'
    });

    await Server._instance.start();

    console.info('Server running on %s', Server._instance.info.uri);
    console.info(`Server - Visit ${Server._instance.info.uri}/documentation for Swagger docs`);

  } catch (err) {
    console.log("Error starting server: ", err);
    throw err;
  }
};

module.exports = Server;
