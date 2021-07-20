const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const baseUrl = 'https://api.bitrise.io/v0.1/';

module.exports = {
  get: (path, params, token) => {
    const http = rateLimit(axios.create(), { maxRPS: 3 })
    const url = new URL(`${baseUrl}${path}`);

    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    const header = { Authorization: `${token}` };
    const config = { headers: header };
    return http.get(url.toString(), config);
  },
};
