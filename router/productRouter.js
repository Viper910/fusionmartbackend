const Router = require("express").Router;
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const productRouter = Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const getProducts = await Product.find({});
    res.status(200).send(getProducts);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await Product.findById(req.params.id);
      res.status(200).send(product);
    }
    else{
      res.status(400).send({ message: "Product Not found" });
    }
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProduct = await Product.insertMany(data.products);
    res.send(createdProduct);
  })
);

module.exports = productRouter;
