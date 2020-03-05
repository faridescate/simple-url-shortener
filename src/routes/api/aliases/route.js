'use strict';

const validator = require('./validator');

const Route = async function (server, config) {
  const Controllers = {
    aliases:  require('./controller'),
  };

  await server.route([
    {
      method: 'POST',
      path: '/api/aliases',
      handler: Controllers.aliases.createLink,
      options: {
        description: 'Endpoint to produce the shortened URL should',
        notes: 'The shortened URL should is returned in the payload of the response',
        validate: validator.createShortCode.validate,
        response: validator.createShortCode.response,
        tags: ['api']
      }
    }
  ]);
}

module.exports = Route;
