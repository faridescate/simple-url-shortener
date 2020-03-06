'use strict';

const validator = require('./validator');

const Route = async function (server, config) {
  const Controllers = {
    status:  require('./controller'),
  };

  await server.route([
    {
      method: 'GET',
      path: '/api/status/{hash}',
      handler: Controllers.status.getStatus,
      options: {
        description: 'Endpoint to get status',
        validate: validator.getStatus.validate,
        response: validator.getStatus.response,
        tags: ['api']
      }
    }
  ]);
}

module.exports = Route;
