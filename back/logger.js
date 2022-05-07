const winston = require('winston');

module.exports.logger_to_file = (file_path) => {
    const logger = winston.createLogger({
        level: 'error',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: file_path }),
        ],
    });

    return logger;
}