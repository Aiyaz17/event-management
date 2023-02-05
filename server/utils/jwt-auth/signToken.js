const jwt = require("jsonwebtoken");

module.exports = async (id, role) => {
  return await jwt.sign({ id, role }, "Problem statement dusra hain", {
    expiresIn: "7d",
  });
};
