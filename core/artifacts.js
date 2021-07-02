const apiPaginator = require('./api/paginator');
const api = require('./api/client');

const listArtifacts = async (token, appSlug, buildSlug) => {
  const urlParams = new URLSearchParams();
  const path = `apps/${appSlug}/builds/${buildSlug}/artifacts`;
  return apiPaginator.listItems(path, urlParams, token);
};

const getArtifactInfo = async (token, appSlug, buildSlug, artifactSlug) => {
  const urlParams = new URLSearchParams();
  const path = `apps/${appSlug}/builds/${buildSlug}/artifacts/${artifactSlug}`;
  const resp = await api.get(path, urlParams, token);
  return resp.data.data;
};

module.exports = {
  list: listArtifacts,
  getInfo: getArtifactInfo,
};
