const { Command } = require('commander');

const program = new Command();

program
  .version('0.0.1')
  .description('CLI tool for interacting with the bitrise api')
  .command('init', 'Set up the cli')
  .command('config', 'Update environment settings')
  .command('build', 'Actions related to builds')
  .parse(process.argv);