'use strict';

const schemas = require('../../../utils/schemas');

const validator = {
  createShortCode: {
    validate: {
      payload: schemas.urlSchema,
      failAction: async (request, h, err) => {
        return err;
      }
    },
    response: {
      schema: schemas.shortUrlSchema,
      failAction: async (request, h, err) => {
        console.log('failAction',err);
        return err;
      }
    }
  }
};

module.exports = validator
