const jwt = require("jsonwebtoken");
const models = require("../models/admin/admin.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    if (token === "") {
      throw new Error();
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await models.User.findOne({
      _id: data._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res
      .status(401)
      .send({ status: 401, error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
