const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    description: String,
})

module.exports = mongoose.model('Post', postSchema);
