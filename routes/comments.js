const express = require('express');
const router = express.Router({ mergeParams: true });

const {validateComment, isLoggedIn, isCommentAuthor} = require('../middleware');
const comments = require('../controllers/comment');

router.post('/', isLoggedIn, validateComment, comments.createComment);

router.delete('/:commentId', isLoggedIn, isCommentAuthor, comments.deleteComment);

module.exports = router;

