const express = require('express');
const router = new express.Router();
const Post = require('../models/post');
const multer = require('multer');


const { addPost, getPost } = require('../controllers/post');
const { protect } = require('../middleware/auth');

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    console.log(file)
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please uplode image only!'));
    }
    cb(undefined, true);
  },
});

router.route('/').post(protect, addPost).get(protect, getPost);





module.exports = router;
