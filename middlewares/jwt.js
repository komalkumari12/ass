const jwt = require("jsonWebToken");

exports.isAuth = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      return res.json({
        message: "Token missing",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const userid = req.headers.userid;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (decodedToken.user._id === userid) {
      next();
    } else {
      return res.json({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (e) {
    return res.json({
      message: "Something went wrong",
      error: e.message,
    });
  }
};
