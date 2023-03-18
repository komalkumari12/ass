const userService = require("../services/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(409).json({
        message: "Fill all details",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService.saveUser({
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Signup successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(409).json({
        message: "Fill all details",
      });
    }
    const user = await userService.getUser({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "Complete Signup first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Wrong credentials",
      });
    }

    const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Login successful",
      data: user._doc,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { password, otp } = req.body;

    const user = await userService.getUser({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "Complete Signup first",
      });
    }

    let updatedUser = "";

    if (user.otp === otp) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatedUser = await userService.updateUser(id, {
        ...user,
        password: hashPassword,
      });

      return res.json({
        message: "Password Changed",
        data: updatedUser,
      });
    } else {
      return res.json({
        message: "Wrong Otp",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userService.getUser({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "Complete Signup first",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    await userService.updateUser(user._id, {
      otp,
    });

    return res.status(200).json({
      message: "Otp sent",
      data: otp,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
