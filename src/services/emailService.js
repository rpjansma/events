'use strict';

const config = require('../config.js')
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
  sendgrid.send({
    to: to,
    from: 'calendar@api.com',
    subject: subject,
    html: body
  })
}