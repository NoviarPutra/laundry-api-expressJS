const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../models");
dotenv.config();

module.exports = {
  signUp: async (req, res) => {
    const method = req.method;
    if (method === "POST") {
      try {
        const { username, email, password } = req.body;
        const salt = crypto.randomBytes(16).toString("hex");
        const hashPassword = crypto
          .pbkdf2Sync(password, salt, 1000, 64, "sha512")
          .toString("hex");
        const payload = new User({
          username: username,
          email: email,
          salt: salt,
          password: hashPassword,
        });
        const results = await payload.save();
        return res.status(201).json({
          status: 201,
          messages: `${results.username} added successfully`,
          data: results,
        });
      } catch (error) {
        return res.json({
          success: false,
          messages: `${
            error.keyValue.username || error.keyValue.email
          } is registered`,
        });
      }
    } else {
      return res.status(405).json({
        status: 405,
        message: "Method Not Allowed",
      });
    }
  },
  signIn: async (req, res) => {
    const method = req.method;
    const { username, password } = req.body;
    const payload = {
      username: username,
    };
    const SECRET = process.env.SECRET;
    const option = {
      algorithm: "HS256",
    };
    if (method === "POST") {
      try {
        const findUser = await User.find(payload);
        if (findUser.length > 0) {
          const compare = crypto
            .pbkdf2Sync(password, findUser[0].salt, 1000, 64, "sha512")
            .toString("hex");
          if (compare === findUser[0].password) {
            const token = jwt.sign(username, SECRET, option);
            return res.status(200).json({
              isLogin: true,
              token: token,
            });
          } else {
            return res.status(400).json({
              isLogin: false,
              message: "wrong password",
            });
          }
        } else {
          return res.status(404).json({
            message: "Username not found",
          });
        }
      } catch (error) {
        console.log(error);
        return res.send({
          message: error,
        });
      }
    }
  },
};
