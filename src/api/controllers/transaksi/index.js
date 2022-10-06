const {
  getTotalHarga,
  getSisa,
  getKembali,
  getUser,
  generatePDF,
} = require("../../helpers");
const { all, terimaCucian, get, update } = require("../../models/transaksi");

module.exports = {
  getAllTransaksi: async (req, res) => {
    try {
      const result = await all(req.query);
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  terimaCucian: async (req, res) => {
    req.body.totalHarga = helper.getTotalHarga(req);
    req.body.sisa = helper.getSisa(req);
    req.body.kembali = helper.getKembali(req);
    req.body.pic = helper.getUser(req);

    try {
      let result = await terimaCucian(req.body);
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  getNomorTerima: async (req, res) => {
    try {
      let nomorTerima = req.params.nomorterima;
      const result = await get(nomorTerima);
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  updateTransaksi: async (req, res) => {
    let nomorTerima = req.params.nomorterima;
    try {
      let result = await update(req.body, nomorTerima);
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  print: async (req, res) => {
    let nomorTerima = req.params.nomorterima;
    const faktur = await get(nomorTerima);
    generatePDF(res, faktur);
  },
};
