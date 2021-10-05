const axios = require('axios');
const Bottleneck = require('bottleneck');

const baseUrl = 'https://api.bitrise.io/v0.1/';

const limiter = new Bottleneck({
  minTime: 333, // 3 requests per second
});

module.exports = {
  get: (path, params, token) => {
    const url = new URL(`${baseUrl}${path}`);

    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    const header = { Authorization: `${token}` };
    const config = { headers: header };
    return limiter.schedule(() => axios.get(url.toString(), config));
  },
};
