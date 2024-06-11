const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    filename: { type: String },
    url: { type: String }
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_250,h_200');
});

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
    },
    body: {
        type: String,
        required: true
    },
    images: [imageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    voters: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        voteType: {
            type: String,
            enum: ['upvote', 'downvote']
        }
    }],
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
})

postSchema.virtual('votes').get(function() {
    return this.upvotes - this.downvotes;
});

postSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', postSchema);
