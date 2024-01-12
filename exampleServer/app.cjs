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

  console.log('balances: ', balances);

  res.send({
    balance,
  });
});

// Note: Could also be an HTTP PATCH as the points being redeemed are being updated.
// OR the route could be differently structured to better clarify the intent if required
app.post("/users/:userId/points/:pointsToRedeem", (req, res) => {
    const userId = Number.parseInt(req.params.userId);
    const pointsToRedeem = Number.parseInt(req.params.pointsToRedeem);

    if (Number.isNaN(userId)) {
      res.status(400);
      return res.send(JSON.stringify("Invalid User ID"));
    }

    if (Number.isNaN(pointsToRedeem) || Number(pointsToRedeem) <= 0) {
      res.status(400);
      return res.send(JSON.stringify("Points to be redeemed must be a positive integer > 0"));
    }

    if (!balances.has(userId)) {
        res.status(404);
        return res.send(JSON.stringify("User not found"));
    }

    const balance = balances.get(userId);
    const updatedBalance = balance - pointsToRedeem;

    if(updatedBalance < 0) {
        res.status(400);
        return res.send(JSON.stringify(`Points to be redeemed: ${pointsToRedeem} must be less than existing balance: ${balance}`));
    }

    balances.set(userId, updatedBalance);

    console.log('updated balances: ', balances);

    res.send({
        balance:updatedBalance,
    });

});

app.listen(8080);
