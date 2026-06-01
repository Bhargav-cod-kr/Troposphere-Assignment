const {
  calculateCartPricing,
} = require("../services/discountService");

const calculateDiscount = (req, res) => {
  const { cart, discounts = [] } = req.body;

  if (!Array.isArray(cart)) {
    return res.status(400).json({
      message: "cart must be an array",
    });
  }

  if (!Array.isArray(discounts)) {
    return res.status(400).json({
      message: "discounts must be an array",
    });
  }

  const supportedDiscounts = ["PERCENT", "FLAT"];

  for (const discount of discounts) {
    if (!supportedDiscounts.includes(discount.type)) {
      return res.status(400).json({
        message: `Unsupported discount type: ${discount.type}`,
      });
    }
  }

  const result = calculateCartPricing(cart, discounts);

  res.status(200).json(result);
};

module.exports = {
  calculateDiscount,
};