const express = require( "express");
const { getAllUser, login, signup,logout,setProfile,getUserProfile,updatePassword, getConnectedPeople } = require( "../controller/userController");
const auth = require('../middlewares/authorization')
const router = express.Router();

router.get("/getUsers", auth,getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout)
router.post("/setProfile",auth,setProfile)
router.get('/getUserProfile',auth,getUserProfile)
router.post('/updatePassword',auth,updatePassword)
router.get('/getConnectedPeople',auth,getConnectedPeople)
module.exports = router;
