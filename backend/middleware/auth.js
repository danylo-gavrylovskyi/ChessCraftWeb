const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { id: decodedToken.id };
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = auth;
