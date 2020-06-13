const nodemailer = require('nodemailer');
const config = require('../config/mail');
var fs = require('fs');
var handlebars = require('handlebars');
var path = require('path');
module.exports = {
  prepareTemplate: (templatePath, data) => {
    let file = path.join(__dirname, '../views/emails/', templatePath);
    let html = fs.readFileSync(file, { encoding: 'utf-8' });
    // console.log(html);
    let template = handlebars.compile(html);
    return template(data);
  },
  send: async (from, to, subject, template) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure, // true for 465, false for other ports
      auth: config.smtp.auth
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: template // html body
    };
    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
  }
};