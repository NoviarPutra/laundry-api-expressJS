const express = require("express");
const { addProduct, getListProduct } = require("../../api/controllers/product");
const router = express.Router();

router.get("/", getListProduct);
router.post("/", addProduct);

module.exports = router;
