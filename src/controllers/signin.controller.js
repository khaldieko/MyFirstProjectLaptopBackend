const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");

const generateToken = require("../utils/generateToken.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../Error/customError");
const { sign } = require("jsonwebtoken");
dotenv.config();

async function login(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new ValidationError(
        "Expected username or password",
        !username ? username : password
      );
    }
    const user = await User.findOne({ username });
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        return res.status(200).json({
          id: user._id,
          username: user.username,
          token: `Bearer ${generateToken(user)}`,
        });
      }
      console.log(bcrypt.compareSync(password, user.password), user.password, password);
    }
    
    return res
      .status(401)
      .json({ status: "failed", message: "incorrect username or password" });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.status).json({
        status: "failed",
        message: `Validation error: ${error.message}, but got ${error.cause}`,
      });
      return;
    }
    return res.status(500).json({
      status: "failed",
      message: "unable to complete request",
    });
  }
}

module.exports = login;
