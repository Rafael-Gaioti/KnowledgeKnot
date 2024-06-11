const mongoose = require('mongoose');
const Post = require('../models/post')
const {titles, bodies, generateRandomDate} = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/knowledgeknot', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("Database connected")
})

const seedDB = async () => {
    await Post.deleteMany({});
    for(let i = 0; i <= 10; i++) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
        const randomDate = generateRandomDate();

        const post = new Post ({
            author: '661d9971bc31b6adb5c43f96',
            title: randomTitle,
            body: randomBody,
            createAt: randomDate,
            upvotes: Math.floor(Math.random() * 100), // Número aleatório de upvotes
            downvotes: Math.floor(Math.random() * 100) // Número aleatório de downvotes

        })
        await post.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});