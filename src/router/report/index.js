const express = require("express");
const {
  download,
  getReportCucian,
  getReportPelangga,
} = require("../../api/controllers/report");

const router = express.Router();

router.get("/download/:nomorterima", download);
router.get("/faktur", getReportCucian);
router.get("/pelanggan", getReportPelangga);

module.exports = router;
