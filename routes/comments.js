const express = require('express');
const router = express.Router({ mergeParams: true });

const expressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const Post = require('../models/post');
const Comment = require('../models/comment');
const {validateComment, isLoggedIn, isCommentAuthor} = require('../middleware');

router.post('/', isLoggedIn, validateComment, catchAsync(async (req, res) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    post.save();
    comment.save();
    res.redirect(`/posts/${id}`);
}))

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(async (req, res) => {
    const {id, commentId} = req.params;

    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId} })
    await Comment.findByIdAndDelete(commentId);

    res.redirect(`/posts/${id}`);
}))

module.exports = router;