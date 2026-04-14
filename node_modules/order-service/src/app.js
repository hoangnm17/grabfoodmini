const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL;

app.post("/api/v1/orders", async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;

    for (const item of items) {
      const response = await axios.get(
        `${RESTAURANT_SERVICE_URL}/api/v1/menu-items/${item.menuItemId}`
      );

      total += response.data.price * item.quantity;
    }

    try {
      await axios.post(`${PAYMENT_SERVICE_URL}/api/v1/payments`, {
        amount: total
      });

      return res.json({ status: "PAID", total });
    } catch {
      return res.json({ status: "CANCELLED", total });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("Order running"));