const { Faktur } = require("../schema");

module.exports = {
  all: (query) => {
    let { limit, ...search } = query;
    search.softDelete = false;
    return new Promise((resolve, reject) => {
      Faktur.find(search, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
        .lean()
        .limit(limit ? limit : 10);
    });
  },
  get: (nomorterima) => {
    return new Promise((resolve, reject) => {
      Faktur.findById(
        nomorterima,
        { "daftarBarang._id": 0, __v: 0 },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  terimaCucian: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await new Faktur(data).save());
      } catch (error) {
        reject(error);
      }
    });
  },
  update: (data, nomorTerima) => {
    return new Promise((resolve, reject) => {
      Faktur.findByIdAndUpdate(nomorTerima, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
