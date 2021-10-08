const builds = require('./builds');
const apiPaginator = require('./api/paginator');
const api = require('./api/client');

jest.mock('./api/paginator');
jest.mock('./api/client');

beforeEach(() => {
  apiPaginator.listItems.mockReset();
});

test('should return build details', () => {
  const resp = { data: { data: { a: 'b' } } };
  api.get.mockImplementation(() => Promise.resolve(resp));

  builds.get('token', 'appSlug', 'buildSlug').then((buildInfo) => {
    expect(buildInfo).toEqual(resp.data.data);
  });
});

test('should return all builds', () => {
  const resp = ['a', 'b'];
  apiPaginator.listItems.mockImplementation(() => Promise.resolve(resp));

  builds.list('a', {}).then((listedBuilds) => {
    expect(listedBuilds).toEqual(resp);
  });
});

test('should pass url params to api client', () => {
  const inputParams = { before: '1', after: '2', next: '3' };
  apiPaginator.listItems.mockImplementation((appSlug, params) => {
    expect(params.get('before')).toBe(inputParams.before);
    expect(params.get('after')).toBe(inputParams.after);
    return { data: { data: [], paging: {} } };
  });
  return builds.list('a', 'b', { ...inputParams });
});

test('should pass no url params to api client if none provided', () => {
  const inputParams = {};
  apiPaginator.listItems.mockImplementation((appSlug, params) => {
    expect(params.get('before')).toBeNull();
    expect(params.get('after')).toBeNull();
    return { data: { data: [], paging: {} } };
  });
  return builds.list('a', 'b', inputParams);
});

test('should trigger a build', () => {
  const inputParams = {};
  api.post.mockImplementation((path, body, config) => Promise.resolve({ "data": { path, body, config } }));
  const anAppSlug = "a"
  const aToken = "b"
  const aWorkflowId = "c"
  builds.trigger(aToken, anAppSlug, aWorkflowId).then((resp) => {
    const expectedBody = { "build_params": { "workflow_id": aWorkflowId }, "hook_info": { "type": "bitrise" } }
    expect(resp.path).toBe(`apps/${anAppSlug}/builds`)
    expect(resp.body).toEqual(expectedBody)
    expect(resp.config).toBe(aToken)
  });
});
