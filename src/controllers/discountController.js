const calculateDiscount = (req, res) => {
  res.status(200).json({
    message: "Discount calculation endpoint reached",
  });
};

module.exports = {
  calculateDiscount,
};