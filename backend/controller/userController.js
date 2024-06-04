const User = require( "../model/userModel");
const jwt = require('jsonwebtoken')

 const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if(!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

 const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists!" });
  }

  const user = new User({
    username,
    email,
    password,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(400).send('error while signup')
  }
  return res.status(201).json({ user });
};

 const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Couldn't Find User By This Email" });
  }

  if (existingUser.password!==password) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const accessToken = jwt.sign(email, 'SECRET');
  res.cookie('token',accessToken)
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser,accessToken });
};

module.exports = {login,signup,getAllUser};