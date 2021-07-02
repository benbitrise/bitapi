const commander = require('commander');

const { config } = require('./config');
const builds = require('../core/builds');

const program = new commander.Command();

program
  .command('list')
  .description('list builds for current app')
  .action(async () => {
    const token = await config.getToken();
    const app = await config.getApp();
    builds.list(token, app).then((list) => {
      console.log(JSON.stringify(list));
    }).catch((e) => {
      console.error(e.message);
    });
  });

program.command('artifact', 'interact with artifacts from builds');

program.parse(process.argv);
