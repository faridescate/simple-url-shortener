'use strict'

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

const plugins = [];


plugins.push(Inert);
plugins.push(Vision);

// add hapi swagger integration
plugins.push(
  {
    plugin: HapiSwagger,
    options: {
      info: {
        'title': Package.description,
        'version': Package.version
      },
      pathPrefixSize: 1,
      payloadType: 'form'
    }
  }
);

module.exports = plugins
