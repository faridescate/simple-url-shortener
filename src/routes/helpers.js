'use strict';

// add ping route by default for health check
let routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.redirect('/shorten');
    },
    options: {
      description: 'Dummy health check point',
      notes: 'Dummy health check point, only verifies if server is alive',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/ping',
    handler: function (request, h) {
      return 'pong'
    },
    options: {
      description: 'Dummy health check point',
      notes: 'Dummy health check point, only verifies if server is alive',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/404',
    handler: function (request, h) {
      return h.view('404');
    },
    options: {
      description: 'Not found page'
    }
  },
];

// export routes
module.exports = routes;
