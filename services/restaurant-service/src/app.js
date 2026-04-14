const express = require("express");
const data = require("./data");

const app = express();

app.get("/api/v1/menu-items/:id", (req, res) => {
  const item = data.find(i => i.id == req.params.id);
  res.json(item);
});

app.listen(3000, () => console.log("Restaurant running"));