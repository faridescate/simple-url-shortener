'use strict';
const Boom = require('@hapi/boom');
const schemas = require('../../../utils/schemas');

const Configs = require('../../../configuration');

const serverConfigs = Configs.getServerConfigs();
const BASE_DOMAIN = serverConfigs.baseDomain;

const Route = async function (server, config) {
  const Controllers = {
    status: require('../../api/status/controller'),
  };

  await server.route({
    method: 'GET',
    path: '/s/{hash}',
    handler: async function (request, h) {
      const link = await Controllers.status.getStatus(request, h);
      if (link.isBoom){
        return link;
      }
      link.shorten = `${BASE_DOMAIN}/r/${link.hash}`
      return h.view('status', { link });
    },
    options: {
      description: 'Shorten main view',
      tags: ['api']
    },
  });
}

module.exports = Route;
