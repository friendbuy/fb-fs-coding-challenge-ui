/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const balances = new Map();
balances.set(1, 100);
balances.set(2, 50);

//Emulating a data store similar to balances indexed by the same key
const history = new Map();
// history.set(1,[]); //starting point :)
// history.set(2,[]);

const updateHistory = (userId, points) => {
    if(!history.has(userId)) {
        history.set(userId, [points]);
        return;
    }
    history.get(userId).push(points);
}

const formatHistory = (userId) => {
    return (history.get(userId) || []).map(points => {
        if(points > 0) {
            return `Added ${points} points`;
        } else if (points < 0){
            return `Redeemed ${points * -1} points`;
        }
    });
}

const sumHistory = (userId) => {
    return (history.get(userId) || []).reduce((total, points) => total + points, 0);
}

const getTransactionHistory = userId => {
    const historicalBalance = sumHistory(userId);
    const currentBalance = balances.get(userId) || 0;
    const balanceDiff = currentBalance - historicalBalance;
    const startingBalance = (balanceDiff > 0) ? balanceDiff : 0;
    return {
        startingBalance,
        currentBalance,
        history: formatHistory(userId),
    }
}

const validateUserId = (req,res,next) => {
    const userId = Number.parseInt(req.params.userId);

    if (Number.isNaN(userId)) {
        res.status(400);
        return res.send(JSON.stringify("Invalid User ID"));
    }

    if (!balances.has(userId)) {
        res.status(404);
        return res.send(JSON.stringify("User not found"));
    }

    next();
}

const validatePoints = (req,res,next) => {
    const points = Number.parseInt(req.params.points);
    if (Number.isNaN(points) || Number(points) <= 0) {
      res.status(400);
      return res.send(JSON.stringify("Points provided must be a positive integer > 0"));
    }

    next();
}

app.get("/points/balance/:userId", validateUserId, (req, res) => {
  const userId = Number.parseInt(req.params.userId);
  const balance = balances.get(userId);

  console.log('balances: ', balances);

  res.send({
    balance,
  });
});

//HACK: make it app.get to hit it directly from the browser for lazier testing ;)
app.post("/users/:userId/points/balance/:points", validateUserId, validatePoints, (req, res, next) => {
    const userId = Number.parseInt(req.params.userId);
    const points = Number.parseInt(req.params.points);

    const balance = balances.get(userId);
    const updatedBalance = balance + points;
    balances.set(userId, updatedBalance);
    updateHistory(userId, points);
    res.send({
        balance:updatedBalance,
    });
});

app.get("/users/:userId/history", validateUserId, (req,res) => {
    const userId = Number.parseInt(req.params.userId);
    return res.send(getTransactionHistory(userId))
});

// Note: Could also be an HTTP PATCH as the points being redeemed are being updated.
// OR the route could be differently structured to better clarify the intent if required
app.post("/users/:userId/points/:points", validateUserId, validatePoints, (req, res) => {
    const userId = Number.parseInt(req.params.userId);
    const points = Number.parseInt(req.params.points);

    const balance = balances.get(userId);
    const updatedBalance = balance - points;

    if(updatedBalance < 0) {
        res.status(400);
        return res.send(JSON.stringify(`Points to be redeemed: ${points} must be less than existing balance: ${balance}`));
    }

    updateHistory(userId, -1 * points);
    balances.set(userId, updatedBalance);

    console.log('updated balances: ', balances);

    res.send({
        balance:updatedBalance,
    });

});

app.listen(8080);
