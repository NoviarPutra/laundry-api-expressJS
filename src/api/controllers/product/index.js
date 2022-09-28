const { getAll, saveProduct } = require("../../models/product");

module.exports = {
  getListProduct: async (req, res) => {
    const query = req.query;
    try {
      const response = await getAll(query);
      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
  addProduct: async (req, res) => {
    try {
      let payload = req.body;
      payload.user = {
        username: req.user.username,
        email: req.user.email,
      };
      const response = await saveProduct(payload);
      return res.status(201).json({
        succes: true,
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
};
