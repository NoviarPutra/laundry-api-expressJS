const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("./src/router");
// const routerUser = require("./src/router");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1", routerUser);
// app.use("/api/v1", routerUser);

router(app);

mongoose
  .connect(URI)
  .then(() => {
    console.log(`MongoDB is connected !!!`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
