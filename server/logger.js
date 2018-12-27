/* eslint-disable no-console */

const ip = require('ip');
const chalk = require('chalk');

const divider = chalk.gray('\n-----------------------------------');

const logger = {
    log: (message) => {
        console.log(message);
    },

    // Called whenever there's an error on the server we want to print
    error: (err) => {
        console.error(chalk.red(err));
    },

    // Called when express.js app starts on given port w/o errors
    appStarted: (port, host) => {
        console.log(`\n\nServer started ! ${chalk.green('✔')}\n`);

        console.log(`${chalk.bold('Access URLs:')}${divider}`);
        console.log(`Localhost: ${chalk.magenta(`http://${host}:${port}`)}`);
        console.log(`LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}`);
        console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);
    }
};

module.exports = logger;
