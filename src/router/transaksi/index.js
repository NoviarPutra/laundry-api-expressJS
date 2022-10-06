const express = require("express");
const {
  getAllTransaksi,
  terimaCucian,
  getNomorTerima,
  updateTransaksi,
} = require("../../api/controllers/transaksi");
const router = express.Router();

router.get("/", getAllTransaksi);
router.post("/", terimaCucian);
router.get("/:nomorterima", getNomorTerima);
router.put("/:nomorterima", updateTransaksi);

module.exports = router;
