const discountHandlers = require("../discounts");

const round = (value) =>
  Number(value.toFixed(2));

const calculateCartPricing = (
  cart,
  discounts = []
) => {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const totalDiscount = discounts.reduce(
    (total, discount) => {
      const handler =
        discountHandlers[discount.type];

      if (!handler) {
        return total;
      }

      return (
        total +
        handler(subtotal, discount)
      );
    },
    0
  );

  const total = Math.max(
    0,
    subtotal - totalDiscount
  );

  return {
    subtotal: round(subtotal),
    discount: round(totalDiscount),
    total: round(total),
  };
};

module.exports = {
  calculateCartPricing,
};