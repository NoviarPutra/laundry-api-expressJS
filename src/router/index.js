const express = require("express");
// const router = express.Router();
const { signUp, signIn } = require("../api/controllers/user");

// router.post("/user/register", signUp);
// router.post("/user/login", signIn);

// module.exports = router;
module.exports = (app) => {
  app.use("/api/v1/user/register", signUp);
  app.use("/api/v1/user/login", signIn);
};
