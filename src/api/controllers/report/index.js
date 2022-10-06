const {
  generatePDF,
  laporanTransaksiCucian,
  laporanTransaksiPelanggan,
} = require("../../helpers");
const { laporanPelanggan, laporanTransaksi } = require("../../models/report");
const { get } = require("../../models/transaksi");

module.exports = {
  download: async (req, res) => {
    try {
      let nomorTerima = req.params.nomorterima;
      const faktur = await get(nomorTerima);
      generatePDF(res, faktur);
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  getReportCucian: async (req, res) => {
    try {
      const faktur = await laporanTransaksi(req.query);
      // helper.generatePDF(res, faktur);
      laporanTransaksiCucian(res, faktur);
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  getReportPelangga: async (req, res) => {
    try {
      const faktur = await laporanPelanggan(req.query);
      laporanTransaksiPelanggan(res, faktur);
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
};
