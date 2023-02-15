const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  if (req.headers !== undefined) {
    const authorization = JSON.stringify(req.headers.authorization);
    if (authorization) {
      const token = authorization.slice(8, authorization.length - 1);
      jwt.verify(
        token,
        process.env.JWT_SECRET || "somethingsecret",
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: "Invalid Token" });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "No Token" });
    }
  }
  else{
    next;
  }
};

module.exports = {
  generateToken: generateToken,
  isAuth: isAuth
};
