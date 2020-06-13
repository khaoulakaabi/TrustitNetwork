const express = require("express");
const router = express.Router();
const { body } = require('express-validator/check');
const validationResult = require('../../middlewares/validationResult');
const auth = require("../../middlewares/auth");
const projectController = require('../../controllers/project.controller');
const accessControl = require('../../middlewares/accessControl');   
const initQuery = require('../../middlewares/initQuery');

/* GET ALL Projects */
router.get("/", [
  auth,
  accessControl('projects', 'read'),
  initQuery
], projectController.getAll);

router.get("/MyProjects", [
  auth,
  accessControl('projects', 'update'),
  initQuery
], projectController.getMyProjects);

router.post("/", [
    auth,
    accessControl('projects', 'create'),
    body('name').exists(),
    body('description').exists(),
    body('club').exists(),
    validationResult
     /*upload.single('projectImage')*/
  ], projectController.create);

router.get("/:_id", [
  auth,
  accessControl('projects', 'read')
], projectController.getById);

router.patch("/:_id/approve", [
  auth,
  accessControl('project_approve', 'update')
], projectController.approve);

router.patch("/:_id/reject", [
  auth,
  accessControl('project_reject', 'update')
], projectController.reject);

router.patch("/:_id", [
    auth,
    accessControl('projects', 'update'),
    body('name').exists(),
    body('description').exists(),
    validationResult
     /*upload.single('projectImage')*/
  ], projectController.update);

router.delete("/:_id", [
  auth,
  accessControl('projects', 'delete')
], projectController.delete);

router.post("/:_id/members", [
  auth,
  accessControl('members', 'update'),
  body('email').isEmail(),
  validationResult
], projectController.addProjectMember);

module.exports = router;