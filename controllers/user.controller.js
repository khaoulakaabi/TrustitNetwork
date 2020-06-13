const User = require('../models/user');
const boom = require('boom');
const keys = require("../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require('../config/app');
const mailer = require('../helpers/mailer');
const crypto = require('crypto');
const hashConfig = require('../config/hash');

const userController = {

    login: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        // Find user by email
        User.findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
                return next(boom.unauthorized('Email not found'));
            }
            if(user.status !== 'confirmed') {
                return next(boom.unauthorized('Please confirm your email before to login'));
            }
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        _id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretKey,
                        {
                            expiresIn: keys.expiresIn
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                // token: "Bearer " + token
                                token: token
                            });
                        }
                    );
                } else {
                    return next(boom.unauthorized('Uncorrect password'));
                }
            });
        });
    },
    // Registration is only for investors
    register: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return next(boom.badRequest("Email already exists"));
            }
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: 'investor',
                status: 'pending'
            });
            const token = await crypto.randomBytes(20).toString('hex');
            newUser.activationKey = token;
            const hash = await bcrypt.hash(req.body.password, hashConfig.bcryptRounds);
            newUser.password = hash;
            const result = await newUser.save();
            let savedUser = { ...result._doc };
            delete savedUser.password;
            delete savedUser.activationKey;
            // send mail
            let template = mailer.prepareTemplate('confirm_account.html', {
                firstName: savedUser.firstName,
                lastName: savedUser.firstName,
                activationKey: token,
                uri: `${config.HOST}/confirm-account?token=${token}&email=${savedUser.email}`
            });
            mailer.send(config.MAIN_MAIL, savedUser.email, 'Registration to Trust-iT', template);
            res.status(200).json(savedUser);

        }catch (err) {
            return next(boom.badRequest(err));
        }
    },

    getAll: (req, res, next) => {
      let conditions = req.query.conditions;
      if(req.user.role !== 'admin') {
        conditions.role = 'investor'
      }
        User.paginate(conditions, req.query.options).then((result) => {
            res.status(200).json(result);
          }).catch((err) => {
            return next(boom.badRequest('Unexpected error', err));
        });
      },

    me: (req, res, next) => {
        return res.status(200).json(req.user);
    },

    getById: (req, res, next) => {
        const id = req.params._id;
        User.findById(id)
        .populate([{
          path: 'projects',
          model: Project,
          select: 'name status'
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
    
    update: async (req, res, next) => {
        let newUser = req.body;
        if(req.user.role !== 'admin') {
          delete newUser.status;
        }
        try {
          let user = await User.findOneAndUpdate({_id: req.params._id}, {
            ...newUser
          }, {
            new: true
          });
          res.status(200).json(user);
        } catch (err) {
          return next(boom.badRequest(err));
        }
      },
    delete: (req, res, next) => {
        User.remove({
            _id: req.params._id
        }).exec().then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        }).catch(err => {
                return next(boom.badRequest(err));
        });
    },
    confirmAccount: async (req, res, next) => {
        try {
        const user = await User.findOne({
            email: req.query.email, activationKey: req.query.token
        })
        await User.findByIdAndUpdate({ 
            _id: user._id 
        }, { 
            status: 'confirmed', 
            activationKey: undefined
        });
        // send mail
        let template = mailer.prepareTemplate('confirm_account_success.html', {
            firstName: user.firstName,
            lastName: user.firstName
        });
        mailer.send(config.MAIN_MAIL, user.email, 'Registration to Trust-iT', template);
        res.status(200).json({ email: user.email });
        } catch (err) {
            return next(boom.badRequest('Unexpected error', err));
        }
    },
    checkInvitationLinkForClub: async(req, res, next) => {
        try {
            const user = await User.findOne({
              email: req.query.email, invitationKey: req.query.token
            })
            if(user===null) {
                return next(boom.badRequest('Invalid invitation link or email'));
            }
            res.status(200).json({ email: user.email });
          } catch (err) {
            return next(boom.badRequest('Unexpected error', err));
          }
    },
    acceptInvitationForClub: async(req, res, next) => {
        try {
            const user = await User.findOne({
              email: req.query.email, invitationKey: req.query.token
            })
            if(user===null) {
                return next(boom.badRequest('Invalid invitation link or email'));
            }
            const hash = await bcrypt.hash(req.body.password, hashConfig.bcryptRounds);
            await User.findByIdAndUpdate({
                _id: user._id
            }, { 
                status: 'confirmed', 
                invitationKey: undefined,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
            });
            res.status(200).json({ email: user.email });
          } catch (err) {
            return next(boom.badRequest('Unexpected error', err));
          }
    },
    forgotPassword: async (req, res, next) => {
        try {
          const user = await User.findOne({ email: req.body.email });
          let token = await crypto.randomBytes(20).toString('hex');
          /*eslint-disable */
          const resetPasswordKey = await User.findByIdAndUpdate(user._id, {
            passwordResetKey: token
          });
          /*eslint-disable */
    
          let template = mailer.prepareTemplate('reset_password.html', {
            firstName: user.firstName,
            lastName: user.lastName,
            passwordResetKey: token,
            uri: `${config.HOST}/reset-password?token=${token}&&email=${user.email}`
          });
          mailer.send(config.MAIN_MAIL, user.email, 'Password Reset', template);
          res.status(200).json({ result: 'password reset email has been sent' });
        }
        catch (err) {
          return next(boom.badRequest('Unexpected error', err));
        }
    },
    resetPassword: async (req, res, next) => {
        try {
          const user = await User.findOne({
            email: req.query.email,
            passwordResetKey: req.query.token
          });
          if (!user) return next(boom.badRequest("token expired"));;
          const hash = await bcrypt.hash(req.body.password, hashConfig.bcryptRounds);
          await User.findByIdAndUpdate({
            _id: user._id
          }, {
              password: hash,
              passwordResetKey: undefined
            });
          let template = mailer.prepareTemplate('reset_password_sucess.html', {
            firstName: user.firstName,
            lastName: user.lastName,
          });
          mailer.send(config.MAIN_MAIL, user.email, 'Trust-iT Password Reset Successfully', template);
          res.status(200).json({ message: 'Password Reset Successfully' });
        } catch (err) {
          return next(boom.badRequest('Unexpected error', err));
        }
      }
};

module.exports = userController;