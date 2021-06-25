const commander = require('commander');
const config = require('./config');


const program = new commander.Command();

program
.command('app', 'modify the current app')
.command('token', 'the access token used to auth into the API')

program.parse(process.argv);