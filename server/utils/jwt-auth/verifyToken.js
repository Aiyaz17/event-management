const catchAsync = require("../error-handling/catchAsync");
const jwt = require('jsonwebtoken')
const util = require('util')
module.exports = catchAsync(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in to gain access"));
  }

  // console.log(token)
  const decoded = await util.promisify(jwt.verify)(token, "Problem statement dusra hain");
  req.user = decoded;
  // console.log(decoded)
  next();
});
