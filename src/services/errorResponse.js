'use strict'

exports.error500 = (res) => {
  res.status(500).send({
    message: 'We had a failure while trying to make your requisition happen. Sorry, try again!',
  });
};

