'user strict';

const Boom = require('@hapi/boom');
const Link = require('../../../models/link');

const getStatus = async (request, h) => {
  const { hash } = request.params;
  try {
    let link = await Link.getByHash({ hash });

    if (!link) {
      return Boom.notFound(`${hash} not found`);
    }
    return link;

  } catch (error) {

    return Boom.badImplementation(error);

  }
}

module.exports = {
  getStatus,
}
