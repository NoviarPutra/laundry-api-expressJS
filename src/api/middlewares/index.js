const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  auth: (req, res, next) => {
    const SECRET = process.env.SECRET;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "a client is forbidden from accessing a valid URL",
        });
      } else {
        req.user = user;
        next();
      }
    });
  },
  isRole: (req, res, next) => {
    const ONLY_OPERATOR_ADMIN = "ADMIN";
    // TODO: secure token with roles (minor)
    if (req.user) {
      if (req.user.role === ONLY_OPERATOR_ADMIN) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Maaf anda buka operator admin!" });
      }
    }
  },
};
