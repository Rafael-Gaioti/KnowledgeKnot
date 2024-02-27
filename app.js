const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('view', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('teste');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})