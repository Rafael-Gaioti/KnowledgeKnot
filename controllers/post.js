const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');
const { postFormattedDate, handleVote } = require('../utils/postUtils');


module.exports.allPosts = catchAsync(async (req, res) => {
    const { sort } = req.query;
    let posts;

    if(sort === 'mostvoted'){
        posts = await Post.aggregate([
            {
                $addFields: {
                    votes: { $subtract: ['$upvotes', '$downvotes'] }
                }
            },
            {
                $sort: { votes: -1 } // Ordenar por votos
            }, 
        ]);

        posts = await Post.populate(posts, { path: 'author' });
    } else {
        let sortOrder;

        switch (sort) {
            case 'oldest':
                sortOrder = { createAt: 1 }; // Mais antigo
                break;
            case 'newest':
                sortOrder = { createAt: -1 }; // Mais recente
                break;
            default:
                sortOrder = { createAt: 1 }; // Ordem padrão (mais antigos)
                break;
        }

        posts = await Post.find({}).populate('author').sort(sortOrder);

    }

    res.render('posts/allPosts', { posts: posts, postFormattedDate, sort });
})

module.exports.renderNewForm = (req, res) => {
    res.render('posts/new');
}

module.exports.createNewPost = catchAsync(async (req, res) => {
    const post = new Post (req.body.post);
    post.author = req.user._id;
    post.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
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
    const currentDate = new Date;
    const post = await Post.findByIdAndUpdate(id, { $set: {...req.body.post, updatedAt: currentDate}, 
        $push: {
             images: req.files.map(f => ({ url: f.path, filename: f.filename }))
             }
        }, { new: true });
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await post.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Post alterado com sucesso!');
    res.redirect(`/posts/${post.id}`);
})

module.exports.upvote = (req, res) => {
    handleVote(req, res, 'upvote');
}

module.exports.downvote = (req, res) => {
    handleVote(req, res, 'downvote');
}

module.exports.deletePost = catchAsync(async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/posts')
})

