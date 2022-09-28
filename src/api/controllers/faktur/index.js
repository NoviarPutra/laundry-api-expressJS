const { saveOrder } = require("../../models/faktur");

module.exports = {
  receiveOrder: async (req, res) => {
    const method = req.method;
    switch (method) {
      case "POST":
        try {
          const {
            nomorHP,
            customerName,
            alamat,
            berat,
            totalHarga,
            uangMuka,
            orderList,
            orderStatus,
            pickUpStatus,
          } = req.body;
          const date = new Date();
          let days = new Array(7);
          days[0] = "Minggu";
          days[1] = "Senin";
          days[2] = "Selasa";
          days[3] = "Rabu";
          days[4] = "Kamis";
          days[5] = "Jum'at";
          days[6] = "Sabtu";
          const dates = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          const payload = {
            tanggalTerima: `${days[date.getDay()]},${dates}-${month}-${year}`,
            nomorHP: nomorHP,
            customerName: customerName,
            alamat: alamat,
            berat: berat,
            totalHarga: berat * 10000,
            uangMuka: uangMuka,
            sisa: uangMuka < totalHarga ? totalHarga - uangMuka : 0,
            kembali: uangMuka > totalHarga ? uangMuka - totalHarga : 0,
            orderList: orderList,
            orderStatus: orderStatus,
            pickUpStatus: pickUpStatus,
            pic: {
              username: req.user.username,
              email: req.user.email,
            },
          };
          const response = await saveOrder(payload);
          if (response) {
            return res.status(200).json({
              data: response,
            });
          }
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
