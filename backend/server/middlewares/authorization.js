const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const cookieToken = req.cookies.token;
  if (!cookieToken) {
    res.status(401).send({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  try {
    const user = jwt.verify(cookieToken, 'SECRET');
    req.username = user.username;
    req.email = user.email
    next();
  } catch (error) {
    res.status(401).send({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};