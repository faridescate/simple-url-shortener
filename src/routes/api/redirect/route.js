'use strict';

const validator = require('./validator');

const Route = async function (server, config) {
  const Controllers = {
    redirect:  require('./controller'),
  };

  await server.route([
    {
      method: 'GET',
      path: '/r/{hash}',
      handler: Controllers.redirect.redirect,
      options: {
        description: 'Endpoint to produce the shortened URL should',
        notes: 'The shortened URL should is returned in the payload of the response',
        validate: validator.redirect.validate,
        tags: ['api']
      }
    }
  ]);
}

module.exports = Route;
