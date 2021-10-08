const apiPaginator = require('./api/paginator');
const api = require('./api/client');

const getBuild = async (token, appSlug, buildSlug) => {
  const path = `apps/${appSlug}/builds/${buildSlug}`;
  const resp = await api.get(path, new URLSearchParams(), token);
  return resp.data.data;
};

const listBuilds = async (token, appSlug, params = {}) => {
  const path = `apps/${appSlug}/builds`;
  const urlParams = new URLSearchParams();
  if (params.before) {
    urlParams.append('before', params.before);
  }
  if (params.after) {
    urlParams.append('after', params.after);
  }
  return apiPaginator.listItems(path, urlParams, token);
};

module.exports = {
  list: (token, appSlug, params = {}) => listBuilds(token, appSlug, params),
  get: (token, appSlug, buildSlug) => getBuild(token, appSlug, buildSlug),
};
