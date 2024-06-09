const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const cookieToken = req.cookies.token;
  if (!cookieToken) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  try {
    const user = jwt.verify(cookieToken, 'SECRET');
    req.username = user;
    next();
  } catch (error) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};