const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  const { current = 1, pageSize = 20, name, level } = req.query;
  const filter = {
    ...(name && { name }),
    ...(level && { level }),
  };

  const data = await Category.find(filter)
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize))
    .populate("parent");

  const total = await Category.countDocuments(filter);

  return res.status(200).json({ data, total });
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const oldCategory = await Category.findOne({ name });

  if (oldCategory) {
    return res.status(500).json({ message: "This category already exists!" });
  }

  const categoryModel = new Category({ ...req.body });
  await categoryModel.save();
  return res.json({ success: true, code: 200 });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  return res.status(200).json({ success: true });
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (category) {
    res.status(200).json({ data: category, success: true });
  } else {
    res.status(500).json({ message: "The category does not exist!" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
  if (existingCategory) {
    return res.status(500).json({ message: "This category already exists!" });
  }
  await Category.findByIdAndUpdate({ _id: id }, req.body);
  return res.status(200).json({ success: true });
};
