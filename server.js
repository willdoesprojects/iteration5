const express = require("express");
const session = require("express-session");
const mongodbSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const uri = "mongodb+srv://swe432:swe432@iteration5.4lxqgj9.mongodb.net/?retryWrites=true&w=majority";

const accountsRoute = require("./routes/AccountsRouter");
const Preference = require("./routes/PreferencesRouter");
const songsRoute = require("./routes/SongsRouter");
const musicPlayerRoute = require("./routes/MusicPlayerRouter");

const crypto = require('crypto');
const { db } = require("./models/Users");

mongoose.connect(uri).then(() => {
    console.log("Connected!");
})

const store = new mongodbSession({
    uri: uri,
    collection: "Sessions"
})

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

const sessionSecret = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: store
}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true}));

//Route for music player/home page
app.use(musicPlayerRoute);

//Route for signing and creating accounts
app.use(accountsRoute);

//Route for Preference page
app.use(Preference);

//Route for CRUD operations on songs
app.use(songsRoute);

//Logoout route
app.post("/logout", async (req, res) => {

    if (req.session.isAuth) {
        req.session.destroy();
        res.redirect("/");
    }
})

let port = 8080;
app.listen(port, () => {
 console.log("Server running at port= " + port);
});

