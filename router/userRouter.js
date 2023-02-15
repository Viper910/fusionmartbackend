const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils");

const userRouter = router;

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUser = await User.insertMany(data.users);
    res.send({ createdUser });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({message:'Invalid Password or UserName'})
  })
);

userRouter.post('/register' , expressAsyncHandler(async (req,res)=> {
  try {
    const user = new User({
      name:req.body.name,
      email:req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    const createUser = await User.create(user);
    res.status(200).send({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      token: generateToken(createUser),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message:"Email Already exist"
    });
  }
}))


module.exports = userRouter;
