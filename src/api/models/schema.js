const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
});
userSchema.set("timestamps", true);

const productSchema = Schema({
  productName: String,
  user: {
    username: String,
    email: String,
  },
});

const fakturSchema = Schema({
  tanggalTerima: String,
  nomorHP: {
    type: String,
    length: 12,
  },
  customerName: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
  },
  berat: {
    type: Number,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  uangMuka: {
    type: Number,
    required: true,
  },
  sisa: {
    type: Number,
  },
  kembali: {
    type: Number,
  },
  orderList: [
    {
      item: String,
      jumlah: Number,
    },
  ],
  orderStatus: {
    type: String,
    enum: ["ONPROGRESS", "DONE"],
    default: "ONPROGRESS",
  },
  pickUpStatus: {
    type: String,
    enum: ["YES", "NO"],
    default: "NO",
  },
  pic: {
    username: String,
    email: String,
  },
});

const Faktur = mongoose.model("Faktur", fakturSchema);
const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Faktur, Product, User };
