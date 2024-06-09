const auth = require('../middlewares/authorization')
const express = require( "express");
const router = express.Router();
const {getAllImages, getUserImage, createPost} = require('../controller/postController')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/allImage',auth,getAllImages)
router.get('/getUserImage',auth,getUserImage)
router.post('/createPost',auth,upload.single('file'),createPost)


module.exports = router;