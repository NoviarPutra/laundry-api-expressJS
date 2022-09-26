const { getAll, saveProduct } = require("../../models/product");

module.exports = {
  getListProduct: async (req, res) => {
    const method = req.method;
    const query = req.query;
    switch (method) {
      case "GET":
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
        break;
      case "POST":
        try {
          let payload = req.body;
          payload.user = {
            username: req.user.username,
            email: req.user.email,
          };
          const response = await saveProduct(payload);
          return res.status(201).json({
            data: response,
          });
        } catch (error) {
          return res.status(400).json({
            message: error,
          });
        }
        break;

      default:
        return res.status(405).json({
          status: 405,
          message: "Method Not Allowed",
        });
        break;
    }
  },
};
