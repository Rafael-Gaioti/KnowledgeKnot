const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],

})

module.exports = mongoose.model('Comment', commentSchema);