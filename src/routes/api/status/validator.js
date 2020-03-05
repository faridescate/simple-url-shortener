'use strict';

const schemas = require('../../../utils/schemas');

const validator = {
  getStatus: {
    validate: {
      params: schemas.hashSchema
    },
    response: {
      schema: schemas.linkSchema
    }
  }
};

module.exports = validator
