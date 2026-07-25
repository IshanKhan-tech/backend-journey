const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  req.user = decode

  next()
};

module.exports = identifyUser;
