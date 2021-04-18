const jwt = require('jsonwebtoken');
const config = require('config');
const ExpiredToken = require("../models/ExpiredToken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  
  let findToken = await ExpiredToken.findOne({"tokenID" : token} , function (err,res){});
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

   // for token
  if(findToken != null)
  {
    return res.status(401).json({msg: "Expired Token"});
  }
  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
