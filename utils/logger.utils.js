
const path = require('path')
const logger = require('perfect-logger')

const logPath = path.join(__dirname, '../logs')

const createLogger = (moduleName, level, message, data) => {
    logger.initialize(moduleName, {
        logLevelFile: 0,
        logLevelConsole: 0,
        logDirectory: logPath,
        projectName: process.env.project,
        maximumLogFieSize: 102400000,
        timezone: 'America/Sao_Paulo'
    })

    switch (level) {
        case 'WARN':
            return logger.warn(message, data)
        case 'INFO':
            return logger.info(message, data)
        case 'DEBUG':
            return logger.debug(message, data)
        case 'CRIT':
            return logger.crit(message, data)
    }
}

module.exports = {
    createLogger
}
