const { Faktur } = require("../schema");

module.exports = {
  saveOrder: (data) => {
    const response = new Promise((resolve, reject) => {
      new Faktur(data).save((err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return response;
  },
};
