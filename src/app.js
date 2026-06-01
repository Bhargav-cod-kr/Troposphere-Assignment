const express = require("express");
const discountRoutes = require("./routes/discountRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Config-Driven Discount Engine API is running",
  });
});

app.use("/", discountRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});