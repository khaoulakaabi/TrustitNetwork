const { validationResult } = require('express-validator/check');
const boom = require('boom');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array()[0]);
    return next(boom.badRequest(errors.array()[0].param + ' : ' + errors.array()[0].msg));
  }
  next();
};