const express = require("express");
const router = express.Router();
const { body } = require('express-validator/check');
const { query } = require('express-validator/check');
const validationResult = require('../../middlewares/validationResult');
const userController = require('../../controllers/user.controller');
const auth = require("../../middlewares/auth");
const accessControl = require('../../middlewares/accessControl');
const customValidator = require('../../helpers/customValidator');
const initQuery = require('../../middlewares/initQuery');


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", [
  body('email', 'Email is required').exists(),
  body('email', 'Invalid format').isEmail(),
  body('password', 'Password is required').exists(),
  validationResult
], userController.login);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", [
  body('firstName', 'firstName is required').exists(),
  body('lastName', 'lastName is required').exists(),
  body('email', 'Invalid format').isEmail(),
  body('password', 'Password is required').exists(),
  body('passwordConfirmation').exists()
    .custom((value, { req }) => value === req.body.password),
  validationResult
],userController.register);

router.get('/', [
  auth,
  accessControl('users', 'read'),
  initQuery
], userController.getAll);

router.get('/me',  [
  auth
], userController.me);

router.get("/:_id", [
  auth,
  accessControl('users', 'read')
], userController.getById);


router.patch("/:_id", [
  auth,
  accessControl('users', 'update'),
  /*body('firstName', 'firstName is required').exists(),
  body('lastName', 'lastName is required').exists(),
  body('email', 'Invalid format').isEmail(),
  body('password', 'Password is required').exists(),
  body('passwordConfirmation').exists()
  .custom((value, { req }) => value === req.body.password),*/
  validationResult
],userController.update);

router.delete("/:_id",  [
  auth,
  accessControl('users', 'delete')
], userController.delete);

router.post('/confirmAccount', [
  query('email').exists(),
  query('email').isEmail(),
  query('token').exists().isLength({ min: 1 }),
  validationResult
], userController.confirmAccount);

router.post('/checkInvitationLinkForClub', [
  query('email').isEmail(),
  query('token').exists().isLength({ min: 1 }),
  validationResult
], userController.checkInvitationLinkForClub);


// acept Invitation for club (president or project owner)
router.post('/acceptInvitationForClub', [
  query('email').isEmail(),
  query('token').exists().isLength({ min: 1 }),
  body('firstName', 'firstName is required').exists(),
  body('lastName', 'lastName is required').exists(),
  body('password', 'Password is required').exists(),
  body('passwordConfirmation')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  validationResult
], userController.acceptInvitationForClub);

router.post('/forgotPassword', [
  body('email').isEmail(),
  body('email').custom(value => customValidator.isEmailExist(value)),
  validationResult
], userController.forgotPassword);

router.post('/resetPassword', [
  query('email').isEmail(),
  query('token').exists().isLength({ min: 1 }),
  body('password').exists().isLength({ min: 6 }),
  body('passwordConfirmation')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  validationResult
], userController.resetPassword);


module.exports = router;