const fs = require('fs');

const fsPromises = fs.promises;
const os = require('os');
const path = require('path');

const configPath = path.join(os.homedir(), '.bitapi');
exports.configPath = configPath;

const readConfig = () => fsPromises.readFile(configPath).then((data) => JSON.parse(data));

const writeConfig = (newConfig) => fsPromises.writeFile(configPath, JSON.stringify(newConfig));

exports.config = {
  init: () => writeConfig({}),
  getApp: () => readConfig().then((configBody) => configBody.app),
  setApp: (appSlug) => readConfig().then((configBody) => {
    const newConfig = { ...configBody };
    newConfig.app = appSlug;
    return writeConfig(newConfig);
  }),
  getToken: () => readConfig().then((configBody) => configBody.token),
  setToken: (token) => readConfig().then((configBody) => {
    const newConfig = { ...configBody };
    newConfig.token = token;
    return writeConfig(newConfig);
  }),
};
