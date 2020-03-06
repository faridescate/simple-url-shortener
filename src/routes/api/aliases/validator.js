'use strict';

const schemas = require('../../../utils/schemas');

const validator = {
  createShortCode: {
    validate: {
      payload: schemas.urlSchema
    },
    response: {
      schema: schemas.shortUrlSchema
    }
  }
};

module.exports = validator
