const commander = require('commander');

const program = new commander.Command();

program
  .version('0.0.1')
  .description('CLI tool for interacting with the bitrise api')
  .command('init', 'Set up the cli')
  .command('config', 'Update environment settings')
  .command('build', 'Actions related to builds')
  .parse(process.argv);
