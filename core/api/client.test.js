const axios = require('axios');
const api = require('./client');

jest.mock('axios');

test('should make get request', () => {
  axios.get.mockImplementation((urlString, config) => {
    const url = new URL(urlString);
    return Promise.resolve({ url, config });
  });

  const path = 'this_is_path';
  const config = new URLSearchParams([['a', 'b']]);
  const token = 'abc';

  return api.get(path, config, token).then((res) => {
    expect(res.url.pathname).toMatch(`${path}`);
    expect(res.url.search).toBe('?a=b');
    expect(res.config.headers).toEqual({ Authorization: 'abc' });
  });
});

test('should make post request', () => {
  axios.post.mockImplementation((urlString, body, config) => {
    const url = new URL(urlString);
    return Promise.resolve({ url, body, config });
  });

  const path = 'this_is_path';
  const body = {"a": "b"}
  const token = 'abc';

  return api.post(path, body, token).then((res) => {
    expect(res.url.pathname).toMatch(`${path}`);
    expect(res.body).toEqual(body);
    expect(res.config.headers).toEqual({ Authorization: 'abc' });
  });
});