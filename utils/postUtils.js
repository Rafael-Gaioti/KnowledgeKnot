const catchAsync = require('./catchAsync');
const Post = require('../models/post');

module.exports.postFormattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(dateString).toLocaleDateString('pt-PT', options);
}

module.exports.handleVote = catchAsync( async (req, res, voteType) => {
    const {id} = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    const existingVote = post.voters.find(voter => voter.userId.equals(userId));

    if(existingVote) {
        if(existingVote.voteType === voteType) {
            req.flash('error', 'Já votou neste post!');
            return res.redirect(`/posts/${post.id}`);

        } else if (existingVote.voteType !== voteType) {
            existingVote.voteType = voteType;
        } 
    } else {
        post.voters.push({ userId, voteType });
    }

    req.flash('success', 'Votado com sucesso!');
    res.redirect(`/posts/${post.id}`);

    await post.save();
})