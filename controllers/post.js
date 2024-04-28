const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');

function postFormattedDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(dateString).toLocaleDateString('pt-PT', options);
}

module.exports.index = catchAsync(async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', {posts: posts, postFormattedDate: postFormattedDate});
})

module.exports.renderNewForm = (req, res) => {
    res.render('posts/new');
}

module.exports.createNewPost = catchAsync(async (req, res) => {
    const post = new Post (req.body.post);
    post.author = req.user._id;
    await post.save();
    req.flash('success', 'Post criado com sucesso!');
    res.redirect(`posts/${post.id}`);
})

module.exports.showPost = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate({
        path: 'comments', 
        populate: {
            path: 'author', 
        },
    }).populate('author');
    if(!post) {
        req.flash('error', 'Post não encontrado!');
        return res.redirect('/posts');
    }
    res.render('posts/show', {post: post, formattedDate: postFormattedDate})
})

module.exports.renderEditForm = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(!post) {
        req.flash('error', 'Post não encontrado!');
        return res.redirect('/posts');
    }
    res.render('posts/edit', {post});
})

module.exports.updatePost = catchAsync(async (req, res) => {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id, {...req.body.post})
    req.flash('success', 'Post alterado com sucesso!');
    res.redirect(`/posts/${post.id}`);
})

module.exports.deletePost = catchAsync(async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/posts')
})

