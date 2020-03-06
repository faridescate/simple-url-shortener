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
        description: 'Use headers to redirect to the original URL',
        validate: validator.redirect.validate,
        tags: ['api', 'redirect']
      }
    }
  ]);
}

module.exports = Route;
