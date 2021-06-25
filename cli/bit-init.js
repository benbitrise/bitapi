const commander = require('commander');
const config = require('./config');


const program = new commander.Command();

program
  .description('Scaffold the CLI')
  .action(() => {
    config.init().then( _ => {
        console.log('bitapi cli initialized.')
    })
  });
program.parse(process.argv);