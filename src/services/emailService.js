'use strict';

let config = require('../config.js')
const nodemailer = require('nodemailer');

let fromMail = 'events.ap.eye@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: fromMail ,
      pass: 'senhadoemail'
  }
  });


exports.send = async (to, subject, body) => {
  let mailOptions = {
    from: fromMail,
    to: to,
    subject: subject,
    text: body
    };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(error);
    }
    console.log(response)
  });
}