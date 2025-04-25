const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  const { current = 1, pageSize = 20, name, status, role } = req.query;
  const data = await User.find({
    ...(name && { name }),
    ...(status && { status }),
    ...(role && { role }),
  })
    .skip(Number(current - 1) * Number(pageSize))
    .limit(Number(pageSize));

  const total = await User.countDocuments({
    ...(name && { name }),
    ...(status && { status }),
    ...(role && { role }),
  });

  return res.status(200).json({ data, total });
};

exports.createUser = async (req, res) => {
  const { name, password } = req.body;
  const oldUser = await User.findOne({ name });

  if (!oldUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new User({
      ...req.body,
      password: hashedPassword,
    });
    await userModel.save();
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ message: "The user already exist" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ success: true });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json({ data: user, success: true });
  } else {
    res.status(500).json({ message: "The user does not exist!" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  let updateData = { ...req.body };

  if (updateData.password) {
    const hashedPassword = await bcrypt.hash(updateData.password, 10);
    updateData.password = hashedPassword;
  }

  if (updateData.name) {
    const existing = await User.findOne({ name: updateData.name, _id: { $ne: id } });
    if (existing) {
      return res.status(400).json({ message: 'The user already exist' });
    }
  }

  await User.findByIdAndUpdate({ _id: id }, updateData);
  return res.status(200).json({ success: true });
};
