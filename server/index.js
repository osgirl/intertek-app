/* eslint consistent-return: 0 */

const { resolve } = require('path');
const express = require('express');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));
const bodyParser = require('body-parser');
const logger = require('./logger');
const setup = require('./middlewares/frontend');
const app = express();


require('./util/auth');
app.use(bodyParser.json());

// Tell express to use this router for any calls that start with /api
app.use('/api', (req, res, next) => {
    require('./routes')(req, res, next); // eslint-disable-line
});

// Handle errors
// eslint-disable-next-line
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});

const watcher = chokidar.watch('./server/routes');

watcher.on('ready', () => {
    watcher.on('all', () => {
        logger.log('Clearing /server/ module cache from server');
        Object.keys(require.cache).forEach((id) => {
            if (/[/\\]server[/\\]/.test(id)) delete require.cache[id];
        });
    });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/'
});

// get the intended host and port number, use localhost and port 8080 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const port = argv.port || process.env.PORT || 8080;

// Start our application.
app.listen(port, host, (err) => {
    if (err) return logger.error(err.message);
    logger.appStarted(port, prettyHost);
});
