'use strict';
const Boom = require('@hapi/boom');
const schemas = require('../../../utils/schemas');

const Route = async function (server, config) {
  const Controllers = {
    aliases: require('../../api/aliases/controller'),
  };

  await server.route({
    method: 'GET',
    path: '/shorten',
    handler: function (request, h) {
      return h.view('shorten');
    },
    options: {
      description: 'Shorten main view',
    }
  });

  await server.route({
    method: 'POST',
    path: '/shorten',
    handler: async function (request, h) {
      const { url } = request.payload;
      try {
        const { shorten } = !request.error && await Controllers.aliases.createLink(request, h);

        return h.view('shorten', {
          shorten,
          url,
          error: request.error
        });
      } catch (error) {
        return Boom.badImplementation(error)
      }
    },
    options: {
      description: 'Shorten main view',
      validate: {
        payload: schemas.urlSchema,
        failAction: async (request, h, err) => {
          if (err){
            request.error = err.toString();
          }
          return h.continue;
        },
      }
    }
  });
}

module.exports = Route;
