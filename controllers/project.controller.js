const boom = require("boom");
const multer = require('multer');
const Project = require("../models/project");
const project = require("../models/project");
const User = require("../models/user");
const config = require('../config/app');
const mailer = require('../helpers/mailer');
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);

  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
})

const projectController = {
  getAll: (req, res, next) => {
    let conditions = req.query.conditions;
    if(req.user.role !== 'admin') {
      conditions.status = 'approved'
    }
    req.query.options.populate = [{
      path: 'club',
      model: Club,
      select: 'name university'
    },
    {
      path: 'owner',
      model: User,
      select: 'firstName lastName'
    },
    {
      path: 'members',
      model: User,
      select: 'firstName lastName'
    }];
    Project.paginate(conditions, req.query.options).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      return next(boom.badRequest('Unexpected error', err));
    });
  },

  getMyProjects: (req, res, next) => {
    let conditions = req.query.conditions;
    if(req.user.role == 'student') {
      conditions.owner = req.user._id
    }
    req.query.options.populate = [{
      path: 'club',
      model: Club,
      select: 'name university'
    },
    {
      path: 'owner',
      model: User,
      select: 'firstName lastName'
    },
    {
      path: 'members',
      model: User,
      select: 'firstName lastName'
    }];
    Project.paginate(conditions, req.query.options).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      return next(boom.badRequest('Unexpected error', err));
    });
  },


  getById: (req, res, next) => {
    const id = req.params._id;
    Project.findById(id)
    .populate([{
      path: 'owner',
      model: User,
      select: 'firstName lastName email'
    },{
      path: 'members',
      model: User,
      select: 'firstName lastName email'
    }
    ,{
      path: 'club',
      model: Club,
      select: 'name'
    }
  ]
    )
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      return next(boom.badRequest(err));
    });
},
  create: async (req, res, next) => {
    try {
      // Check if the student is a project owner in the club he want to add a project
      let club = await Club.findById(req.body.club);
      if (club === null) {
        return next(boom.badRequest('No Club found with this id'));
      }
      if(club.projectOwners.indexOf(req.user._id) ===-1) {
        return next(boom.badRequest('you are not a project owner of this club'));
      }
      let project = new Project({
        name: req.body.name,
        //projectImage: req.file.path
        description: req.body.description,
        club: req.body.club,
        owner: req.user._id,
        status: 'pending'
      });
      project = await project.save();
      res.status(201).json(project);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },
  approve: async (req, res, next) => {
    try {
      let project = await Project.findOneAndUpdate({_id: req.params._id}, {
        status: 'approved'
      }, {
        new: true
      });
      res.status(200).json(project);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  reject: async (req, res, next) => {
    try {
      let project = await Project.findOneAndUpdate({_id: req.params._id}, {
        status: 'rejected'
      }, {
        new: true
      });
      res.status(200).json(project);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  update: async (req, res, next) => {
    let newProject = req.body;
    if(req.user.role !== 'admin') {
      delete newProject.status;
    }
    try {
      let project = await Project.findOneAndUpdate({_id: req.params._id}, {
        ...newProject
      }, {
        new: true
      });
      res.status(200).json(project);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  delete: (req, res, next) => {
    const id = req.params._id;
    Project.remove({
      _id: id
    })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Project deleted',
        });
      })
      .catch(err => {
        return next(boom.badRequest(err));
      });
  },
  addProjectMember: async (req, res, next) => {
    const id = req.params._id;
    try {
      // First of all we have to check if the current user is a owner of the project
      let project = await Project.findOne({
        _id: id,
        // even owner is an array it will compare with inArray
        owner: req.user._id
      });
      // if the project is null so it's not exist or the current user is not a owner
      if(project === null) {
        return next(boom.forbidden('Project not found or forbidden'));
      }
      // otherwise we check if the email to invite already in our database
      let user = await User.findOne({email: req.body.email});
      let token = await crypto.randomBytes(20).toString('hex');
      let userAlreadyExist = true;
      if(user === null) {
        // if user not exist we create it and we set userAlreadyExist to false to define the right mail t send
        userAlreadyExist = false;
        user = new User({
          email: req.body.email,
          firstName: ' ',
          lastName: ' ',
          function: 'student',
          status: 'pending',
          role: 'student',
          invitationKey: token
        });
        user = await user.save();
      }
      let template = '';
      if (userAlreadyExist) {
        // send email to inform the user
        template = mailer.prepareTemplate('member_added.html', {
          ownerFirstName: req.user.firstName,
          ownerLastName: req.user.lastName,
          firstName: user.firstName,
          lastName: user.lastName,
          project: project.name,
          uri: `${config.HOST}/projects/${project._id}`
        });
      } else {
        // send email to the user to join the network
        template = mailer.prepareTemplate('member_invitation.html', {
          ownerFirstName: req.user.firstName,
          ownerLastName: req.user.lastName,
          project: project.name,
          uri: `${config.HOST}/invite/member?token=${token}&email=${user.email}`
        });
      }
      // if user is not already a member add him and send the email
      if(project.members.indexOf(user._id) ===-1){
        project.members.push(user._id);
        project = await project.save();
        mailer.send(config.MAIN_MAIL, user.email, 'Invitation as a member', template);
        res.status(200).json(project);
      }else{
        return next(boom.badRequest('User already a member in this project'));
      }
    }catch(err) {
      return next(boom.badRequest(err));
    }
  }
};

module.exports = projectController;
