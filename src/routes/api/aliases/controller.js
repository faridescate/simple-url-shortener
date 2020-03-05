'user strict';

const Link = require('../../../models/link');
const Configs = require('../../../configuration');

const serverConfigs = Configs.getServerConfigs();
const BASE_DOMAIN = serverConfigs.baseDomain;

const createLink = async (request, h) => {
  const { url } = request.payload;

  let link = await Link.getByAddress({ address: url });

  if (!link) {
    link = await Link.insert({ address: url });
  }

  return { shorten: `${BASE_DOMAIN}/r/${link.hash}` };
}

module.exports = {
  createLink,
}
