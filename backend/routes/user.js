const express = require( "express");
const { getAllUser, login, signup,logout } = require( "../controller/userController");
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout)

module.exports = router;
