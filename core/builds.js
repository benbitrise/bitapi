const apiPaginator = require('./api/paginator');
const api = require('./api/client');

const getBuild = async (token, appSlug, buildSlug) => {
  const path = `apps/${appSlug}/builds/${buildSlug}`;
  const resp = await api.get(path, new URLSearchParams(), token);
  return resp.data.data;
};

const triggerBuild = async (token, appSlug, workflowId) => {
  const path = `apps/${appSlug}/builds`;
  const body = {
    "build_params": {
      "workflow_id": workflowId
    },
    "hook_info": {
      "type": "bitrise"
    }
  }

  const resp = await api.post(path, body, token);
  return resp.data;
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
  trigger: (token, appSlug, workflowId) => triggerBuild(token, appSlug, workflowId),
};
