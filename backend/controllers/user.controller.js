const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user.model");
const path = require("path");
const cloudinaryUpload = require("../utils/cloudinary");
const fs = require("fs");
const createChatHelper = require("../utils/createChatHelper");

// Create a new user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, name } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  // Create a chat with admin
  const chat = await createChatHelper(
    user._id.toString(),
    "644f5b4297fd6423b5f4ecf6"
  );
  console.log(chat);

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});

// Login an user
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch === false) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password",
    });
  }

  // const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  });
});

// Get User Information
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  });
});

// Update avatar
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const file = req.file.filename;
  const filePath = `./images/${file}`;
  const fileName = path.parse(file).name;

  // const userId = req.params.userId;
  const userId = req.body.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  // Upload to Cloudinary
  const { url } = await cloudinaryUpload(fileName, filePath);

  // Deleting local file
  await fs.unlinkSync(filePath);

  // Update Database
  user.avatar = url;
  await user.save();

  res.status(200).json({
    success: true,
    data: user.avatar,
  });
});

// Find users
exports.findUsers = catchAsyncErrors(async (req, res, next) => {
  const { userId, keyword } = req.query;

  const query = {
    _id: { $ne: userId },
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  };

  const users = await User.find(query, "name email avatar").limit(100);

  res.status(200).json({
    success: true,
    data: users,
  });
});
