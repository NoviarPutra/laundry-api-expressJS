const { auth } = require("../api/middlewares");
const userRouter = require("./user");
const productRouter = require("./product");
const transaksiRouter = require("./transaksi");
const reportRouter = require("./report");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", [auth], productRouter);
  app.use("/api/v1/transaksi", [auth], transaksiRouter);
  app.use("/api/v1/report", reportRouter);
};
