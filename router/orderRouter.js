const Router = require("express").Router;
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const { isAuth } = require("../utils");

const orderRouter = Router();

orderRouter.get('/orderhistory', isAuth, expressAsyncHandler(async (req,res)=>{
  const order = await Order.find({user: req.user._id});
  res.send(order);
}))


orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemPrice: req.body.itemPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await Order.create(order);
      console.log("created");
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:orderid", isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const orderInfo = await Order.findById(req.params.orderid);
      res.status(200).send(orderInfo)
    } catch (error) {
      res.status(404).send({message:'Nothing found'})
    }
  })
);

module.exports = orderRouter;
