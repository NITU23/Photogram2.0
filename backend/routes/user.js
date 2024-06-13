const express = require( "express");
const { getAllUser, login, signup,logout,setProfile,getUserProfile } = require( "../controller/userController");
const auth = require('../middlewares/authorization')
const router = express.Router();

router.get("/getUsers", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout)
router.post("/setProfile",auth,setProfile)
router.post('/getUserProfile',auth,getUserProfile)

module.exports = router;
