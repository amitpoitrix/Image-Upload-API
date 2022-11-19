const CustomAPIErrors = require('./custom-api');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');

module.exports = {
    CustomAPIErrors,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}