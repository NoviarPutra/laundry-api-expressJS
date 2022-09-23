const { signUp, signIn } = require("../api/controllers/user");

module.exports = (app) => {
  app.use("/api/v1/user/register", signUp);
  app.use("/api/v1/user/login", signIn);
};
