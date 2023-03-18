const User = require("../models/user");

exports.saveUser = async (body) => {
  const user = await User.create(body);
  return user;
};

exports.getUser = async (body) => {
  const user = await User.findOne({ username: body.username }).select(
    "+password"
  );
  return user;
};

exports.updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, { $set: body });
  console.log(body);
  return user;
};
