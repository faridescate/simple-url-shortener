'use strict';

const Hapi = require('@hapi/hapi');
const Plugin = require('./plugin');

const helpers = require('./routes/helpers');
const Aliases = require('./routes/api/aliases');
const Status = require('./routes/api/Status');
const Redirect = require('./routes/api/redirect');
const Shorten = require('./routes/web/shorten');

const Server = {};

/**
 * TODO:
 * - unit && e2e testing
 * - Status endpoint
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

    await Aliases.init(Server._instance, config);
    await Status.init(Server._instance, config);
    await Shorten.init(Server._instance, config);
    await Redirect.init(Server._instance, config);

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
