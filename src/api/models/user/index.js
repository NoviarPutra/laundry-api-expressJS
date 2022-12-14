const { User } = require("../schema");

module.exports = {
  saveUser: (payload) => {
    const response = new Promise((resolve, reject) => {
      new User(payload).save((err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return response;
  },
  isAutheticated: ({ username }) => {
    const response = new Promise((resolve, reject) => {
      const payload = {
        username: username,
      };
      User.findOne(payload, (err, result) => {
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
