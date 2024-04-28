const express = require('express');
const router = express.Router();
const {isLoggedIn, isAuthor, validatePost} = require('../middleware');
const posts = require('../controllers/post');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', posts.index);

router.get('/new', isLoggedIn, posts.renderNewForm);

router.post('/', isLoggedIn, validatePost, posts.createNewPost);

router.get('/:id', posts.showPost);

router.get('/:id/edit', isLoggedIn, isAuthor, posts.renderEditForm)

router.put('/:id', isLoggedIn, isAuthor, validatePost, posts.updatePost)

router.delete('/:id/delete', isLoggedIn, posts.deletePost)

module.exports = router;