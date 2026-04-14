const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/v1/payments", (req, res) => {
  const { amount } = req.body;

  if (amount > 15) {
    return res.status(400).json({ message: "Payment failed" });
  }

  res.json({ status: "SUCCESS" });
});

app.listen(3000, () => console.log("Payment running"));