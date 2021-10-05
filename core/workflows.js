const YAML = require('yaml');
const ymlClient = require('./bitrise-yml');

const list = async (token, appSlug) => {
  const yml = await ymlClient.getYml(token, appSlug);
  const obj = YAML.parse(yml);
  return Object.keys(obj.workflows);
};

module.exports = {
  list: (token, appSlug, params = {}) => list(token, appSlug, params),
};
