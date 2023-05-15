const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decryptedData.userId;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
