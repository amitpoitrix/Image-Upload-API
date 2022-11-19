const CustomAPIErrors = require('./custom-api');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends CustomAPIErrors {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;