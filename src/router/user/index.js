const express = require("express");
const { signUp, signIn } = require("../../api/controllers/user");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
