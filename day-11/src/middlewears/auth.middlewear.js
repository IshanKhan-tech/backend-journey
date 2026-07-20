const jwt = require("jsonwebtoken");

const identifyUser = async (req, resizeBy, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthrized access" });
  }
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Unauthrized token access" });
  }

  req.user = decode;

  next();
};

module.exports = identifyUser
