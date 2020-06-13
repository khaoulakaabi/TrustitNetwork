const User = require('../models/user');
module.exports = {
  isUnique: async (value, model, field) => {
    var re = false;
    let condition = {};
    condition[field] = value;
    /*eslint-disable */
    const user = await require(`../models/${model}`).find(condition).then(usr => {
      if (usr.length < 1) {
        re = true;
      }
    });
    /*eslint-disable */
    return re;
  },
  isEmailExist: async (value) => {
    var test = false;
    const user = await User.findOne({ email: value });
    if (user) { test = true }
    return test;
  }
  

};