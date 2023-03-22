const mongoose = require("mongoose");

const userDetails = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Enter username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter password"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
    },
    otp: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userDetails);

module.exports = User;
