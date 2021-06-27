const express = require("express");
const path = require("path");
// const fs = require("fs");

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { stringify } = require("querystring");
// mongoose.connect('mongodb://localhost:27017/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 8000;

// defind mongoose schema
const indexSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    // address: String
    // name: String,
});

const Contact = mongoose.model('Contact', indexSchema);
// const Index = mongoose.model('Index', contactSchema);
 
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'hbs') // Set the template engine as pug
/ 
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.hbs', params);

     
})

app.get('/index', (req, res) => {
    const params = {}
    res.status(200).render('index.hbs', params);

})

app.post('/index', (req, res) => {
    var myData = new Contact(req.body);
    // var myData = new Index(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    })
    // res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});