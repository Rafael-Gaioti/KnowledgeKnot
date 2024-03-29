const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

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
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

postSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Comment.deleteMany({
            _id: { 
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Post', postSchema);
