const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor, validatePost} = require('../middleware');
const posts = require('../controllers/post');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.get('/', posts.index);

router.get('/new', isLoggedIn, posts.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), validatePost, posts.createNewPost);

router.get('/:id', posts.showPost);

router.get('/:id/edit', isLoggedIn, isAuthor, posts.renderEditForm);

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validatePost, posts.updatePost);

router.post('/:id/upvote', isLoggedIn, posts.upvote);

router.post('/:id/downvote', isLoggedIn, posts.downvote);

router.delete('/:id/delete', isLoggedIn, posts.deletePost);

module.exports = router;