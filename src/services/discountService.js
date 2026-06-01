const discountHandlers = require("../discounts");

const calculateCartPricing = (
  cart,
  discounts = []
) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalDiscount = discounts.reduce(
    (total, discount) => {
      const handler =
        discountHandlers[discount.type];

      if (!handler) {
        return total;
      }

      return total + handler(
        subtotal,
        discount
      );
    },
    0
  );

  return {
    subtotal,
    discount: totalDiscount,
    total: Math.max(
      0,
      subtotal - totalDiscount
    ),
  };
};

module.exports = {
  calculateCartPricing,
};