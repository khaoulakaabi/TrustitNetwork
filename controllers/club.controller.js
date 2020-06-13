const Club = require('../models/club');
const User = require('../models/user');
const boom = require('boom');
const multer = require('multer');
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
  // reject a file
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

const clubController = {

  getAll: (req, res, next) => {
    let conditions = req.query.conditions;
    if(req.user.role !== 'admin') {
      conditions.status = 'approved'
    }
    req.query.options.populate = {
      path: 'presidents',
      model: User,
      select: 'firstName lastName email'
    };
    Club.paginate(conditions, req.query.options).then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      return next(boom.badRequest(err));
    });
  },


  approve: async (req, res, next) => {
    try {
      let club = await Club.findOneAndUpdate({_id: req.params._id}, {
        status: 'approved'}, {
        new: true
      });
      res.status(200).json(club);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  reject: async (req, res, next) => {
    try {
      let club = await Club.findOneAndUpdate({_id: req.params._id}, {
        status: 'rejected'
      }, {
        new: true
      });
      res.status(200).json(club);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  getById: (req, res, next) => {
    const id = req.params._id;
    Club.findById(id)
      .populate([{
        path: 'presidents',
        model: User,
        select: 'firstName lastName email'
      }, {
        path: 'projectOwners',
        model: User,
        select: 'firstName lastName email'
      }, , {
        path: 'projects',
        model: Project,
        select: 'name'
      }])
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        return next(boom.badRequest(err));
      });
  },

  create: async (req, res, next) => {
    try {
      // before to create the club we have to check if the presedent already exist in the platform
      let user = await User.findOne({
        email: req.body.president
      });
      // if user not exist we create it
      let token = await crypto.randomBytes(20).toString('hex');
      let userAlreadyExist = true;
      if (!user) {
        userAlreadyExist = false;
        user = new User({
          email: req.body.president,
          firstName: ' ',
          lastName: ' ',
          function: ' ',
          status: 'pending',
          role: 'student',
          invitationKey: token});
        user = await user.save();}
      let club = new Club({
        name: req.body.name,
        description: req.body.description,
        university: req.body.university,
        size: req.body.size,
        presidents: [user._id],
        status: 'pending'
      });
      club = await club.save();
      let template = '';
      if (userAlreadyExist) {
        // send email to inform the user
        template = mailer.prepareTemplate('club_president_added.html', {
          club: club.name,
          uri: `${config.HOST}/clubs/${club._id}`
        });
      } else {
        // send email to the user to join the network
        template = mailer.prepareTemplate('club_president_invitation.html', {
          club: club.name,
          uri: `${config.HOST}/invite/club-president?token=${token}&email=${user.email}`
        });
      }
      mailer.send(config.MAIN_MAIL, user.email, 'Invitation to a club', template);
      // send respose to front
      res.status(201).json(club);
    } catch (err) {
      return next(boom.badRequest(err));
    }
  },

  update: (req, res, next) => {
    var query = {
      _id: req.params._id
    };

    Club.findOneAndUpdate(query, {
      ...req.body
    }, {
      new: true
    }, (err, updatedClub) => {
      if (err) {
        return next(boom.boomify(err));
      } else {
        res.status(200).json(updatedClub);
      }
    });

  },

  delete: (req, res, next) => {
    const id = req.params._id;
    Club.remove({
        _id: id
      })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Club deleted'
        });
      })
      .catch(err => {
        return next(boom.badRequest(err));
      });
  },

  addProjectOwner: async (req, res, next) => {
    const id = req.params._id;
    try {
      // First of all we have to check if the current user is a president of the club
      let club = await Club.findOne({
        _id: id,
        // even presidents is an array it will compare with inArray
        presidents: req.user._id
      });
      // if the club is null so it's not exist or the current user is not a president
      if (club === null) {
        return next(boom.forbidden('Club not found or forbidden'));
      }
      // otherwise we check if the email to invite already in our database
      let user = await User.findOne({
        email: req.body.email
      });
      let token = await crypto.randomBytes(20).toString('hex');
      let userAlreadyExist = true;
      if (user === null) {
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
        template = mailer.prepareTemplate('project_owner_added.html', {
          presidentFirstName: req.user.firstName,
          presidentLastName: req.user.lastName,
          firstName: user.firstName,
          lastName: user.lastName,
          club: club.name,
          uri: `${config.HOST}/clubs/${club._id}`
        });
      } else {
        // send email to the user to join the network
        template = mailer.prepareTemplate('project_owner_invitation.html', {
          presidentFirstName: req.user.firstName,
          presidentLastName: req.user.lastName,
          club: club.name,
          uri: `${config.HOST}/invite/project-owner?token=${token}&email=${user.email}`
        });
      }
      // if user is not already a project owner add him and send the email
      if (club.projectOwners.indexOf(user._id) === -1) {
        club.projectOwners.push(user._id);
        club = await club.save();
        mailer.send(config.MAIN_MAIL, user.email, 'Invitation as project owner', template);
        res.status(200).json(club);
      } else {
        return next(boom.badRequest('User already a project owner in this club'));
      }
    } catch (err) {
      return next(boom.badRequest(err));
    }
  }
};

module.exports = clubController;