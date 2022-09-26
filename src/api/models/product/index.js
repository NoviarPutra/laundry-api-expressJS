const { Product } = require("../schema");

module.exports = {
  saveProduct: (payload) => {
    const response = new Promise((resolve, reject) => {
      new Product(payload).save((err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return response;
  },
  getAll: (query) => {
    let { limit, ...search } = query;
    const response = new Promise((resolve, reject) => {
      Product.find(search, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }).limit(limit ? limit : 10);
    });
    return response;
  },
};
