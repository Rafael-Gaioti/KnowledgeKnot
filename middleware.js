const { postSchema } = require('./schemas');
const expressError = require('./utils/ExpressError')
const Post = require('./models/post');
const Comment = require('./models/comment');
const { commentSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Você deve fazer o login primeiro!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);

    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
};

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    if(!post.author.equals(req.user._id)) {
        req.flash('error', 'Você não tem permissão para alterar este post!');
        return res.redirect(`/posts/${post.id}`);
    }
    next();
}

module.exports.isCommentAuthor = async(req, res, next) => {
    const {commentId, id} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)) {
        req.flash('error', 'Você não tem permissão para alterar este post!');
        return res.redirect(`/posts/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);

    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400);
    } else {
        next();
    }
};