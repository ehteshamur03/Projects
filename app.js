const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
const bodyparser = require("body-parser");

//Starting Moongose
var mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/DanceContact');
}

const ContactData = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    msg: String
});

const contact = mongoose.model('contact', ContactData);

app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    })
})
// EXPRESS SPECIFIC STUFF 
app.use('/static', express.static('static'))// --------------------------For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')//----------------------------------------- Set the template engine as pug
app.set('views', path.join(__dirname, 'view'))//----------------------- Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
    res.status(200).render("index.pug");
})
app.get("/home", (req, res) => {
    res.status(200).render("home.pug");
})
app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug");
})

//START THE SERVER 
app.listen(port, () => {
    console.log(`This app is started successfully at: ${port}`)
});
