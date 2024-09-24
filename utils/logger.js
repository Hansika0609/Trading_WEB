// utils/logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage);
};

const info = (message) => {
    log(`INFO: ${message}`);
};

const error = (message) => {
    log(`ERROR: ${message}`);
};

module.exports = {
    info,
    error,
};
