const jwt = require('jsonwebtoken');
const User = require('../models').User;

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: 'You have to be logged in!'});
    }
    const verifiedToken = jwt.decode(token, process.env.JWT_SECRET);
    console.log({ verifiedToken });
    if (!verifiedToken) return res.status(404).end;
    const user = await User.findByPk(verifiedToken.id);
    if (!user) return res.status(404).end;
    req.user = user;
    console.log({ user });
    return next();
  } catch (error) {}
};

exports.permission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json('You do not have permission to perform this action');
    }
    next();
  };
};
