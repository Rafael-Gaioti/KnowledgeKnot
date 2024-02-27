const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Post = require('./models/post')

mongoose.connect('mongodb://localhost:27017/knowledgeknot', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("Database connected")
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', {posts})
})

app.listen(3000, () => {
    console.log('listening on port 3000');
}) 