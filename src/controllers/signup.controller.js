const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const passwordValidator = require("../utils/passwordValidator");
const { ValidationError } = require("../Error/customError");
dotenv.config();

async function signUp(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new ValidationError(
        "Expected username or password",
        !username ? username : password
      );
    }
    const validPassword = passwordValidator(password);
    if (validPassword) {
      const findUser = await User.findOne({ username });
      if (findUser) {
        return res
          .status(400)
          .json({ status: "failed", message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      if (hash) {
        const newUser = await User.create({ username, password });
        const { password, ...bioData } = await newUser.save();
        if (newUser) {
          jwt.sign(
            { id: newUser._id },
            process.env.SECRET,
            { expiresIn: 86000 },
            (error, token) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  status: "failed",
                  message: "unable to complete request",
                });
              }

              return res.status(200).json({
                status: "success",
                data: {
                  token: `Bearer ${token}`,
                  ...bioData,
                },
              });
            }
          );
        }
      }
    }
  } catch (error) {
      console.log(error);
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
module.exports = signUp;
