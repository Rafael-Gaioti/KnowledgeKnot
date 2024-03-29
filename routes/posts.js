const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError')

const Post = require('../models/post');
const Comment = require('../models/comment');

const { postSchema } = require('../schemas')

const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);

    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
};

function postFormattedDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(dateString).toLocaleDateString('pt-PT', options);
}

router.get('/', catchAsync(async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', {posts: posts, postFormattedDate: postFormattedDate})
}))

router.get('/new', (req, res) => {
    res.render('posts/new')
})

router.post('/', validatePost, catchAsync(async (req, res) => {
    const post = new Post (req.body.post);
    await post.save();
    req.flash('success', 'Post criado com sucesso!');
    res.redirect(`posts/${post.id}`);
}))

router.get('/:id', catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('comments');
    if(!post) {
        req.flash('error', 'Post não encontrado!');
        return res.redirect('/posts');
    }
    res.render('posts/show', {post: post, formattedDate: postFormattedDate})
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(!post) {
        req.flash('error', 'Post não encontrado!');
        return res.redirect('/posts');
    }
    res.render('posts/edit', {post})
}))

router.put('/:id', validatePost, catchAsync(async (req, res) => {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id, {...req.body.post})
    res.redirect(`/posts/${post.id}`);
}))

router.delete('/:id/delete', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/posts')
}))

module.exports = router;