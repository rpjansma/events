'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '30m' });
};

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize =  (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Unauthorized access.'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      //Dá pra setar a info da req (ex. username) dps de decodificar, aqui
      //Assim você n precisa fazer isso lá na frente e já mantém a info que tira lá do generateToken()
      //ex.: req.username = decoded.username

      if (error) {
        res.status(401).json({
          message: 'Invalid Token.'
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = function (req, res, next) {
  const token = req.body.token || req.query.token || req.header['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Invalid Token.'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Invalid Token'
        });
      } else {
        if (decoded.roles.includes('admin')) {
          next();
        } else {
          res.status(403).json({
            message: 'Only with an Admin authorization you can do this.'
          })
        }
      }
    });
  };
};