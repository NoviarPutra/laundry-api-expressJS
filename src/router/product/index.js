const express = require("express");
const {
  addProduct,
  getListProduct,
  editProduct,
  detailProduct,
  removeProduct,
} = require("../../api/controllers/product");
const router = express.Router();

router.get("/", getListProduct);
router.post("/", addProduct);
router.get("/:id", detailProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

module.exports = router;
