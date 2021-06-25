const commander = require('commander');

const program = new commander.Command();

program
  .command('create')
  .description('create description')
  .action(() => {
    console.log('Called create');
  });
program.parse(process.argv);