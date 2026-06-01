const express = require("express");

const {
  calculateDiscount,
} = require("../controllers/discountController");

const router = express.Router();

router.post(
  "/calculate",
  calculateDiscount
);

module.exports = router;