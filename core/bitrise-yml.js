const api = require('./api/client');

const getYml = async (token, appSlug) => {
  const path = `apps/${appSlug}/bitrise.yml`;
  const resp = await api.get(path, new URLSearchParams(), token);
  return resp.data;
};

module.exports = {
  getYml: (token, appSlug, params = {}) => getYml(token, appSlug, params),
};
