const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (request, response) => {
  response.json("test ok ok");
});

app.post("/api/transaction", async (request, response) => {
  await mongoose.connect(process.env.MONGO_URL);

  const { name, description, datetime, price } = request.body;

  const transaction = await Transaction.create({
    name,
    description,
    datetime,
    price,
  });

  response.json(transaction);
});

app.listen(4040);
