const discountHandlers = require("../discounts");

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

  for (const item of cart) {
    if (
      typeof item.price !== "number" ||
      typeof item.qty !== "number" ||
      item.price < 0 ||
      item.qty < 0
    ) {
      return res.status(400).json({
        message:
          "price and qty must be non-negative numbers",
      });
    }
  }

  for (const discount of discounts) {
    if (!discountHandlers[discount.type]) {
      return res.status(400).json({
        message: `Unsupported discount type: ${discount.type}`,
      });
    }

    if (
      typeof discount.value !== "number" ||
      discount.value < 0
    ) {
      return res.status(400).json({
        message:
          "discount value must be a non-negative number",
      });
    }
  }

  const result = calculateCartPricing(
    cart,
    discounts
  );

  return res.status(200).json(result);
};

module.exports = {
  calculateDiscount,
};