"use strict";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const data = require("./data");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

const dotenv = require("dotenv");
const orderRouter = require("./router/orderRouter");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/fusionmart",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server been started...");
});

app.get("/api/carouselimages", (req, res) => {
  res.contentType("application/json");
  res.send(JSON.stringify(data.carouselimages));
  res.status(200);
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

app.listen(PORT,() => {
  console.log(`Server started.`);
});
