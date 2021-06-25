const commander = require('commander');
const { config } = require('./config');

const program = new commander.Command();

program
  .command('get')
  .description('get the currently used token')
  .action(() => {
    config.getToken().then((val) => {
      console.log(val);
    });
  });

program
  .command('set')
  .description('get the currently used app')
  .argument('<app-slug>', 'app slug to use')
  .action((appSlug) => {
    config.setToken(appSlug);
  });

program.parse(process.argv);
