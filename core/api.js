const axios = require('axios');

const baseUrl = 'https://api.bitrise.io/v0.1/';

module.exports = {
  get: (path, params, token) => {
    const url = new URL(`${baseUrl}${path}`);

    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    const header = { Authorization: `${token}` };
    const config = { headers: header };
    return axios.get(url.toString(), config);
  },
};
