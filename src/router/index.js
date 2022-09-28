const { auth } = require("../api/middlewares");
const userRouter = require("./user");
const productRouter = require("./product");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", [auth], productRouter);
};
