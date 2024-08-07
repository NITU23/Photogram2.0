const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  users = users.filter((user) => user.email !== req.email);
  return res.status(200).json(users);
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
    return res.status(400).send("Error while signup");
  }

  const accessToken = jwt.sign({ email, username }, "SECRET");

  const hostname = req.hostname;
  const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
  const domain = isProduction ? '.photogram2-0frontend.vercel.app' : 'localhost';

  const cookieOptions = {
    maxAge: 8640000,
    domain: domain,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };

  res.cookie("token", accessToken, cookieOptions);
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
    return res.status(404).json({ message: "Couldn't Find User By This Email" });
  }

  if (existingUser.password !== password) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const accessToken = jwt.sign(
    { email, username: existingUser.username },
    "SECRET"
  );

  const hostname = req.hostname;
  const isProduction = hostname !== 'localhost' && hostname !== '127.0.0.1';
  const domain = isProduction ? '.photogram2-0frontend.vercel.app' : 'localhost';

  const cookieOptions = {
    maxAge: 8640000,
    domain: domain,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };

  res.cookie("token", accessToken, cookieOptions);
  return res.status(200).json({ message: "Login Successful", user: existingUser });
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
    let update = { profilePicture: req.body.file };
    await User.updateOne({ email: email }, update);
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
    let email;
    if (req.query.email !== "undefined") {
      email = req.query.email;
    } else {
      email = req.email;
    }
    let findUser = await User.findOne({ email: email })
    if(findUser===null){
      findUser = await User.findOne({username:email});
    }
    let realUser = await User.findOne({ email: req.email });
    let isFollowing = realUser.followings.includes(findUser._id);

    let details = {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      profile: findUser.profilePicture,
      username: findUser.username,
      email: findUser.email,
      following: isFollowing,
      followers: findUser.followers.length,
      followings: findUser.followings.length,
    };
    console.log("User profile fetched successfully.");
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
      throw new Error("Current password is incorrect.");
    }
    await User.updateOne(
      { username: username },
      { $set: { password: newpassword } }
    );
    res.status(200).send({ message: "Password updated successfully." });
  } catch (err) {
    console.log("Error While Updating Password", err);
    res.status(400).send({
      message:
        err.message === "Current password is incorrect"
          ? "Current password is incorrect."
          : "Error While Updating Password.",
    });
  }
};
const getConnectedPeople = async (req, res) => {
  try {
    let body = req.query.body;

    body = JSON.parse(body);
    let username = body?.username;
    if(username===undefined){
      username = req.email
    }
    let connectionType = body.connections;

    let findConnections;
    if (connectionType === "followings") {
      findConnections = await User.findOne(
        { email: username },
        { followings: 1 }
      );
    } else if (connectionType === "followers") {
      findConnections = await User.findOne(
        { email: username },
        { followers: 1 }
      );
    }
    let users = [];
    if (!findConnections) {
      return res.status(200).send(users );
    }


    let connectionsArray =
      connectionType === "followings"
        ? findConnections.followings
        : findConnections.followers;

    for (let item of connectionsArray) {
      let user = await User.findOne({ _id: item });
      users.push({
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profilePicture,
        email:user.email
      });
    }
    res.status(200).send(users);
  } catch (err) {
    console.log("Error while getting connected people.", err);
    res.status(400).send({ msg: "Error while getting connected people." });
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
  getConnectedPeople,
};
