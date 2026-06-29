const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token received:", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified:", verifiedToken);
    console.log(req.body);
    req.user = { userId: verifiedToken.userId };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).send({ message: "Token is not valid" });
  }
};

module.exports = auth;
