const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
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

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

function postFormattedDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(dateString).toLocaleDateString('pt-PT', options);
}

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', {posts: posts, postFormattedDate: postFormattedDate})
})

app.get('/posts/new', (req, res) => {
    res.render('posts/new')
})

app.post('/posts', async (req, res) => {
    const post = new Post (req.body.post);
    await post.save();
    res.redirect(`posts/${post.id}`);
})

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/show', {post: post, formattedDate: postFormattedDate})
})

app.get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', {post})
})

app.put('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id, {...req.body.post})
    res.redirect(`/posts/${post.id}`);
})

app.delete('/posts/:id/delete', async (req, res) => {
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.redirect('/posts')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
}) 
