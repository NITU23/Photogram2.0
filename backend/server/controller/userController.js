const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists!" });
  }

  const user = new User({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(400).send("error while signup");
  }
  const accessToken = jwt.sign({ email, username }, "SECRET");
  res.cookie("token", accessToken, { maxAge: 900000000000 });
  return res.status(200).json({ user });
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
    return res
      .status(404)
      .json({ message: "Couldn't Find User By This Email" });
  }

  if (existingUser.password !== password) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const accessToken = jwt.sign(
    { email, username: existingUser.username },
    "SECRET"
  );
  res.cookie("token", accessToken, { maxAge: 900000000000 });
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser });
};
const logout = async (req, res) => {
  if (JSON.stringify(req.cookies) != "{}") {
    res.clearCookie("token");
    return res.status(200).send("You have been logged out successfully.");
  }
  res.status(404).send("Unable to logout");
};

const setProfile = async (req, res) => {
  try {
    let email = req.email;
    let findUser = await User.findOne({ email: email });
    findUser.profilePicture = req.body.file;
    findUser.save();
    res
      .status(200)
      .send({ message: "Your Profile has been saved successfully" });
  } catch (err) {
    console.log("Error while uploading profile picture.", err);
    res.status(400).send({ message: "Error While uploading profile picture." });
  }
};
const getUserProfile = async (req, res) => {
  try {
    let email = req.email;
    let findUser = await User.findOne({ email: email });
    let details = {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      profile: findUser.profilePicture,
      username: findUser.username,
      email: findUser.email,
    };
    res.status(200).send(details);
  } catch (err) {
    console.log("Error While Getting user's profile", err);
    res.status(400).send({ message: "Error While Getting user's Profile" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newpassword } = req.body;
    let username = req.username;
    const user = await User.findOne({ username: username });
    if (password !== user.password) {
      throw new Error("Current password is incorrect");
    }
    await User.updateOne(
      { username: username },
      { $set: { password: newpassword } }
    );
    res.status(200).send({ message: "Password updated successfully." });
  } catch (err) {
    console.log("Error While Updating Password", err);
    res
      .status(400)
      .send({
        message:
          err.message === "Current password is incorrect"
            ? "Current password is incorrect"
            : "Error While Updating Password",
      });
  }
};
module.exports = {
  login,
  signup,
  getAllUser,
  logout,
  setProfile,
  getUserProfile,
  updatePassword,
};
