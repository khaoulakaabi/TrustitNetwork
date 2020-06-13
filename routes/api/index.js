const router = require('express').Router();
const users = require('./users');
const projects = require('./projects');
const clubs = require('./clubs');

router.use('/users', users);
router.use('/clubs', clubs);
router.use('/projects', projects);

module.exports = router;
