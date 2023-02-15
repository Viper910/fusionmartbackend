const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  description: { type: String, required: true },
},{
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
