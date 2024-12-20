const jwt = require("jsonwebtoken");
const { applyTimestamps } = require("../models/users.model");

//Manage token, authentication function
const jwtManager = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user.id,
      name: user.name,
    },
    process.env.jwt_salt
  );

  return accessToken;
};

module.exports = jwtManager;
