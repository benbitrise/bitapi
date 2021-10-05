const commander = require('commander');
const { config } = require('./config');
const workflowClient = require('../core/workflows');

const program = new commander.Command();

program
  .command('list')
  .description('list workflows for current app')
  .action(async () => {
    const token = await config.getToken();
    const app = await config.getApp();
    workflowClient.list(token, app).then((workflows) => {
      console.log(JSON.stringify(workflows));
    }).catch((e) => {
      console.error(e.message);
    });
  });

program.parse(process.argv);
