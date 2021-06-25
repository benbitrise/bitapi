jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

const fs = require('fs');

const { config, configPath } = require('./config');

beforeEach(() => {
  fs.promises.writeFile.mockReset();
  fs.promises.readFile.mockReset();
});

test('init creates config file', async () => {
  config.init();
  fs.promises.writeFile.mockResolvedValue();
  expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
  expect(fs.promises.writeFile).toHaveBeenCalledWith(configPath, JSON.stringify({}));
});

test('getApp gets current app', async () => {
  fs.promises.readFile.mockResolvedValue(JSON.stringify({ app: '123' }));
  const app = await config.getApp();
  expect(app).toBe('123');
});

test('getToken gets current token', async () => {
  fs.promises.readFile.mockResolvedValue(JSON.stringify({ token: '123' }));
  const token = await config.getToken();
  expect(token).toBe('123');
});

test('setToken sets token', async () => {
  fs.promises.readFile.mockResolvedValue(JSON.stringify({ token: '123' }));
  fs.promises.writeFile.mockResolvedValue();
  await config.setToken('321');
  expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
  let expectedConfig = { token: '321' };
  expectedConfig = JSON.stringify(expectedConfig);
  expect(fs.promises.writeFile).toHaveBeenCalledWith(configPath, expectedConfig);
});

test('setApp sets app', async () => {
  fs.promises.readFile.mockResolvedValue(JSON.stringify({ app: '123' }));
  fs.promises.writeFile.mockResolvedValue();
  await config.setApp('321');
  expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
  let expectedConfig = { app: '321' };
  expectedConfig = JSON.stringify(expectedConfig);
  expect(fs.promises.writeFile).toHaveBeenCalledWith(configPath, expectedConfig);
});
