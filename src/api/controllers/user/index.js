const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { saveUser, isAutheticated } = require("../../models/user");
dotenv.config();

module.exports = {
  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const salt = crypto.randomBytes(16).toString("hex");
      const hashPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
      const payload = {
        username: username,
        email: email,
        salt: salt,
        password: hashPassword,
      };
      const results = await saveUser(payload);
      return res.status(201).json({
        code: 201,
        status: "Created",
        messages: `${results.username} added successfully`,
        data: results,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        messages: `${
          error.keyValue.username || error.keyValue.email
        } is registered`,
      });
    }
  },
  signIn: async (req, res) => {
    const { username, password } = req.body;
    const payload = {
      username: username,
    };
    const SECRET = process.env.SECRET;
    const option = {
      expiresIn: "1h",
    };
    try {
      const result = await isAutheticated(payload);
      if (result) {
        const compare = crypto
          .pbkdf2Sync(password, result.salt, 1000, 64, "sha512")
          .toString("hex");
        if (compare === result.password) {
          const data = {
            id: result._id,
            username: username,
            email: result.email,
          };
          const token = jwt.sign(data, SECRET, option);
          return res.status(200).json({
            code: 200,
            status: "Ok",
            token: token,
          });
        } else {
          return res.status(400).json({
            code: 400,
            status: "Bad Request",
            message: "Wrong Password",
          });
        }
      } else {
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "Username not found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
};
