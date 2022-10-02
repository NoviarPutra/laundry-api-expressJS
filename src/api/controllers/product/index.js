const { handleId } = require("../../helpers");
const {
  getAll,
  saveProduct,
  edit,
  getById,
  remove,
} = require("../../models/product");

module.exports = {
  getListProduct: async (req, res) => {
    const query = req.query;
    try {
      const response = await getAll(query);
      return res.status(200).json({
        code: 200,
        status: "Ok",
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
        code: 201,
        status: "Created",
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  detailProduct: async (req, res) => {
    const id = handleId(req, res);
    try {
      const response = await getById(id);
      console.log(response);
      if (response) {
        return res.status(200).json({
          code: 200,
          status: "Ok",
          data: response,
        });
      } else {
        return res.status(404).json({
          code: 404,
          status: "Not Found",
        });
      }
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  editProduct: async (req, res) => {
    const id = handleId(req, res);
    try {
      const response = await edit(id, req.body);
      return res.status(200).json({
        code: 200,
        status: "Ok",
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
  removeProduct: async (req, res) => {
    const id = handleId(req, res);
    try {
      const response = await remove(id);
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: response,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: error,
      });
    }
  },
};
