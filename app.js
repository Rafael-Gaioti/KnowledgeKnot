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

app.get('/createapost', async (req, res) => {
    const post = new Post({ title: 'Im a post', description: 'post description' });
    await post.save()
        .then(savedPost => {
            console.log('Post criado com sucesso:', savedPost);
            res.send(savedPost);
        })
        .catch(error => {
            console.error('Erro ao criar o post:', error);
            res.status(500).send('Erro ao criar o post');
        });;
    //res.send(post)
})

app.listen(3000, () => {
    console.log('listening on port 3000');
}) 