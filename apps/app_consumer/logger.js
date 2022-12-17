const winston = require('winston');

const createLogger = (serverId) => {    
    return winston.createLogger({
        format:  winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
          defaultMeta: { service: serverId },
        transports: [
            new winston.transports.Console({
                format: winston.format.colorize(),
                handleExceptions: true,
                handleRejections: true,
            }),
          ],
    });
}


module.exports = (serverId) => {

    const logger = createLogger(serverId)

    
    return {
        info: (message) => logger.log('info', message),
        error: (error) => logger.log('error', error)
    }
}