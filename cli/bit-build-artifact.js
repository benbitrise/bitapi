const commander = require('commander');

const { config } = require('./config');
const artifacts = require('../core/artifacts');

const program = new commander.Command();

program
  .command('list')
  .argument('<build-slug>', 'build slug')
  .description('get list of artifacts for a build')
  .action(async (buildSlug) => {
    const token = await config.getToken();
    const app = await config.getApp();
    artifacts.list(token, app, buildSlug).then((list) => {
      console.log(JSON.stringify(list));
    }).catch((e) => {
      console.error(e);
    });
  });

program
  .command('get')
  .argument('<build-slug>', 'build slug')
  .argument('<artifact-slug>', 'artifact slug')
  .description('get artifact info for a particular artifact from a build')
  .action(async (buildSlug, artifactSlug) => {
    const token = await config.getToken();
    const app = await config.getApp();
    artifacts.getInfo(token, app, buildSlug, artifactSlug).then((artifactInfo) => {
      console.log(JSON.stringify(artifactInfo));
    }).catch((e) => {
      console.error(e);
    });
  });

program.parse(process.argv);
