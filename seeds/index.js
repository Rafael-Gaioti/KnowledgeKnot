const mongoose = require('mongoose');
const Post = require('../models/post')
const {titles, descriptions, generateRandomDate} = require('./seedhelpers');

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
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const randomDate = generateRandomDate();

        const post = new Post ({
            title: randomTitle,
            description: randomDescription,
            createAt: randomDate,
        })
        await post.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});