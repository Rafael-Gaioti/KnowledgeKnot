const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);
