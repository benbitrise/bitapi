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

program
  .command('get')
  .argument('<build-slug>', 'build slug')
  .description('get build details for slug')
  .action(async (buildSlug) => {
    const token = await config.getToken();
    const app = await config.getApp();
    builds.get(token, app, buildSlug).then((build) => {
      console.log(JSON.stringify(build));
    }).catch((e) => {
      console.error(e.message);
    });
  });

  program
  .command('trigger')
  .argument('<workflow-id>', 'workflow id')
  .description('start a build')
  .action(async (workflowId) => {
    const token = await config.getToken();
    const app = await config.getApp();
    builds.trigger(token, app, workflowId).then((build) => {
      console.log(JSON.stringify(build));
    }).catch((e) => {
      console.error(e.message);
    });
  });

program.command('artifact', 'interact with artifacts from builds');

program.parse(process.argv);
