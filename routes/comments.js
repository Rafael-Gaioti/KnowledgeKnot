const express = require('express');
const router = express.Router({ mergeParams: true });

const expressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');

const Post = require('../models/post');
const Comment = require('../models/comment');

const { commentSchema } = require('../schemas')

const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);

    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
};

router.post('/', validateComment, catchAsync(async (req, res) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    const comment = new Comment(req.body.comment);

    post.comments.push(comment);
    post.save();
    comment.save();

    res.redirect(`/posts/${id}`);
}))

router.delete('/:commentId', catchAsync(async (req, res) => {
    const {id, commentId} = req.params;

    await Post.findByIdAndUpdate(id, { pull: { comments: commentId} })
    await Comment.findByIdAndDelete(commentId);

    res.redirect(`/posts/${id}`);
}))

module.exports = router;