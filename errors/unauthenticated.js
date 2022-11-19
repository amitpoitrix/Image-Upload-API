const CustomAPIErrors = require('./custom-api');
const { StatusCodes } = require('http-status-codes');

class UnauthenticatedError extends CustomAPIErrors {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;