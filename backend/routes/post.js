const auth = require('../middlewares/authorization')
const express = require( "express");
const router = express.Router();
const {getAllImages, getUserImage} = require('../controller/postController')



router.get('/allImage',getAllImages)
router.get('/getUserImage',getUserImage)


module.exports = router;