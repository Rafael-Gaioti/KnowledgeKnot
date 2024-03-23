const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/ExpressError')
const path = require('path');

const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

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

app.use('/posts', postRoutes);
app.use('/posts/:id/comments', commentRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    throw new expressError('Not Found!', 404);
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'something went wrong';

    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('listening on port 3000');
}) 
