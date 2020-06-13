const boom = require('boom');
const AccessControl = require('accesscontrol');
const accessControl = require('../config/accessControl');

module.exports = (resource, action) => {
  return (req, res, next) => {
    console.log('user', req.user);
    let ac = new AccessControl(accessControl.grantList);

    if (!ac.hasResource(resource) || !ac.hasRole(req.user.role)) {
      return next(boom.forbidden('Not Allowed: Unregistred role or resource'));
    }
    let permission = false;
    switch (action) {
      case 'create':
        permission = ac.can(req.user.role).createAny(resource);
        break;
      case 'read':
        permission = ac.can(req.user.role).readAny(resource);
        break;
      case 'update':
        permission = ac.can(req.user.role).updateAny(resource);
        break;
      case 'delete':
        permission = ac.can(req.user.role).deleteAny(resource);
        break;
    }
    if (!permission.granted) {
      return next(boom.forbidden('Not Allowed'));
    }

    req.permission = permission;

    return next();
  };
};