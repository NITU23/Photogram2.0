const auth = require('../middlewares/authorization')
const express = require( "express");
const router = express.Router();
const {getAllImages, getUserImage, createPost,fetchUserPosts,deletePost,addComment, getComments, deleteComments} = require('../controller/postController')
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
router.get('/getUserPosts',auth,fetchUserPosts)
router.delete('/deletePost',auth,deletePost)
router.post('/addComment',auth,addComment)
router.get('/getComments',getComments)
router.delete('deleteComment',auth,deleteComments)
module.exports = router;