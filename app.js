const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Item = require('./models/item'); // Import the Item model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/template', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items: items });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    try {
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
