const jwt = require("jsonwebtoken");

const httpError = require("../helpers/http-error");
const { SECRET_KEY } = process.env;

const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401, "Unauthorized request"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id, "-password");
    if (!user || !user.token) next(httpError(401));

    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

module.exports = authenticate;
