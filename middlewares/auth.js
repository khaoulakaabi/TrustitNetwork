const config = require('../config/auth');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

  let token = req.headers['x-auth-token'];
  if (!token) {
    req.user = {
      _id: 0,
      role: 'visitor'
    }
    return next();
  }
  // console.log('secret key', config.secretKey);
  //verify if token value is valid or not 
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err || decoded._id === null) {
      req.user = {
        _id: 0,
        role: 'visitor'
      }
      return next();
    }
    //token value is valid so search user
    User.findById(decoded._id, (err, user) => {
      if (err || user == null) {
        // console.log('test true');
        req.user = {
          _id: 0,
          role: 'visitor'
        }
        return next();
      }
      user = { ...user._doc };
      //we don't need to voir this attributs
      delete user.password;
      delete user.activationKey;
      delete user.passwordResetKey;
      req.user = user;
      return next();
    });
  });
}

module.exports = auth;