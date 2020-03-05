'use strict';
const Boom = require('@hapi/boom');
const schemas = require('../../../utils/schemas');

const Route = async function (server, config) {
  const Controllers = {
    aliases: require('../../api/aliases/controller'),
  };

  await server.route({
    method: 'GET',
    path: '/status/{hash}',
    handler: function (request, h) {
      return h.view('status');
    },
    options: {
      description: 'Shorten main view',
      tags: ['api']
    },
  });
}

module.exports = Route;
