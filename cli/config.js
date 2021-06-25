const fs = require('fs');

const fsPromises = fs.promises;
const os = require('os');
const path = require('path');

const configPath = path.join(os.homedir(), '.bitapi');

const readConfig = () => fsPromises.readFile(configPath).then((data) => JSON.parse(data));

const writeConfig = (newConfig) => fsPromises.writeFile(configPath, JSON.stringify(newConfig));

module.exports = {
  init: () => writeConfig({}),
  getApp: () => readConfig().then((config) => config.app),
  setApp: (appSlug) => readConfig().then((config) => {
    const newConfig = { ...config };
    newConfig.app = appSlug;
    return writeConfig(newConfig);
  }),
  getToken: () => readConfig().then((config) => config.token),
  setToken: (token) => readConfig().then((config) => {
    const newConfig = { ...config };
    newConfig.token = token;
    return writeConfig(newConfig);
  }),
};
