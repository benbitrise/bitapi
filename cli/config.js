const fs = require('fs');
const fsPromises = fs.promises;
const os = require('os');
const path = require('path');

const _configPath = path.join(os.homedir(), '.bitapi')


const _getConfig = () => {
    return fsPromises.readFile(_configPath).then(data => {
        return JSON.parse(data)
    })
}

const _writeConfig = (newConfig) => {
    return fsPromises.writeFile(_configPath, JSON.stringify(newConfig))
}

const config = {
    init: () => {
        return _writeConfig({})
    },
    getApp: () => {
        return _getConfig().then(config => {
            return config['app']
        })
    },
    setApp: (appSlug) => {
        return _getConfig().then(config => {
            config['app'] = appSlug
            return _writeConfig(config)
        })
    },
    getToken: () => {
        return _getConfig().then(config => {
            return config['token']
        })
    },
    setToken: (token) => {
        return _getConfig().then(config => {
            config['token'] = token
            return _writeConfig(config)
        })
    }
}

module.exports = config;