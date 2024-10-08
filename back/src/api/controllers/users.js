const { generateToken } = require("../../utils/token");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const users = await User.findById(userId).populate("restaurant");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json("User not found");
  }
};

const registerUser = async (req, res, next) => {
  const { userName, lastName, email, password, role } = req.body;
  try {
    const newUser = new User({
      userName,
      lastName,
      email,
      password,
      role,
    });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json("This user already exists");
    }
    const userSaved = await newUser.save();
    if (userSaved) {
      return res
        .status(201)
        .json({ message: "user registered correctly", userSaved });
    }
  } catch (error) {
    return res.status(400).json("Error when registering the user");
  }
};

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email }).populate("restaurant");
    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user._id);
      const { password, ...userWithoutPassword } = user._doc;
      return res.status(200).json({ user: userWithoutPassword, token });
    }

    return res.status(400).json("Incorrect username or password");
  } catch (error) {
    return res.status(400).json("Error when login");
  }
};

module.exports = { getUser, registerUser, loginUser };
