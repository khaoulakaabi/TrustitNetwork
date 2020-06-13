const express = require("express");
const router = express.Router();
const {body} = require('express-validator/check');
const validationResult = require('../../middlewares/validationResult');
const clubController = require('../../controllers/club.controller');
const auth = require("../../middlewares/auth");
const accessControl = require('../../middlewares/accessControl');
const initQuery = require('../../middlewares/initQuery');

router.get("/", [
  auth,
  accessControl('clubs', 'read'),
  initQuery
], clubController.getAll);

router.post("/", [
  auth,
  accessControl('clubs', 'create'),
  body('name').exists(),
  body('university').exists(),
  body('size').exists(),
  body('president').isEmail(),
  validationResult
], clubController.create);

router.get("/:_id", [
  auth,
  accessControl('clubs', 'read')
], clubController.getById);

router.patch("/:_id/approve", [
  auth,
  accessControl('club_approve', 'update')
], clubController.approve);

router.patch("/:_id/reject", [
  auth,
  accessControl('club_reject', 'update')
], clubController.reject);

router.patch("/:_id", [
  auth,
  accessControl('clubs', 'update'),
  body('name').exists(),
  body('university').exists(),
  body('size').exists().isLength({
    min: 1
  }),
  validationResult
], clubController.update);

router.delete("/:_id", [
  auth,
  accessControl('clubs', 'delete')
], clubController.delete);

router.post("/:_id/projectOwners", [
  auth,
  accessControl('projectOwners', 'update'),
  body('email').isEmail(),
  validationResult
], clubController.addProjectOwner);

module.exports = router;