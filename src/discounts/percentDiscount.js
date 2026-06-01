module.exports = (subtotal, discount) => {
  return (subtotal * discount.value) / 100;
};