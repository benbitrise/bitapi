const builds = require('./builds');
const apiPaginator = require('./api/paginator');

jest.mock('./api/paginator');

beforeEach(() => {
  apiPaginator.listItems.mockReset();
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
