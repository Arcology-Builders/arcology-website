
var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM',
    dirname: 'logs',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '14d',
    timestamp: true
});

transport.on('rotate', function (oldFilename, newFilename) {
    // zip up the current logs and store them in s3
});

var logger = winston.createLogger({
    transports: [
        transport
    ]
});

logger.info('logger initalized');

module.exports = logger;