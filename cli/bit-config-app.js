const commander = require('commander');
const { config } = require('./config');

const program = new commander.Command();

program
  .command('get')
  .description('get the currently used app')
  .action(() => {
    config.getApp().then((val) => {
      console.log(val);
    });
  });

program
  .command('set')
  .description('set the currently used app')
  .argument('<app-slug>', 'app slug to use')
  .action((appSlug) => {
    config.setApp(appSlug);
  });

program.parse(process.argv);
