'user strict';

const Boom = require('@hapi/boom');
const Link = require('../../../models/link');

const redirect = async (request, h) => {
  const { hash } = request.params;
  try {
    let link = await Link.getByHash({ hash });

    if (!link) {
      return h.redirect('/404');
    }
    await Link.visit({hash});
    return h.redirect(link.address).permanent();

  } catch (error) {

    return Boom.badImplementation(error);

  }
}

module.exports = {
  redirect,
}
