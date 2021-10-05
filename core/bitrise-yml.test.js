const bitriseYml = require('./bitrise-yml');
const api = require('./api/client');

jest.mock('./api/client');

test('getYml returns the YML', () => {
  const resp = { data: 'this is yaml' };
  api.get.mockImplementation(() => Promise.resolve(resp));

  bitriseYml.getYml('token', 'appSlug', 'buildSlug').then((yml) => {
    expect(yml).toEqual(resp.data);
  });
});
