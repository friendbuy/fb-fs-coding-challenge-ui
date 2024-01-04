/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const balances = new Map();

balances.set(1, 100);
balances.set(2, 50);

app.get("/points/balance/:userId", (req, res) => {
  const userId = Number.parseInt(req.params.userId);

  if (Number.isNaN(userId)) {
    res.status(400);
    return res.send(JSON.stringify("Invalid User ID"));
  }

  if (!balances.has(userId)) {
    res.status(404);
    return res.send(JSON.stringify("User not found"));
  }

  const balance = balances.get(userId);

  res.send({
    balance,
  });
});

app.listen(8080);
