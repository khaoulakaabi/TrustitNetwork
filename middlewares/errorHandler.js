const boom = require('boom');

module.exports = (err, req, res, next) => {
  let boomError = {};
  if (!boom.isBoom(err)) {
    Object.assign(boomError, boom.boomify(err));
  } else {
    Object.assign(boomError, err);
  };
  if (boomError.isServer) {
    console.log(err);
  } 
  return res.status(boomError.output.statusCode).json(boomError.output.payload);
};