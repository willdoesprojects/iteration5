const express = require("express");
const session = require("express-session");
const mongodbSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const uri = "mongodb+srv://swe432:swe432@iteration5.4lxqgj9.mongodb.net/?retryWrites=true&w=majority";
const UserModel = require("./models/Users");
const SongsModel = require("./models/Songs");
const crypto = require('crypto');

mongoose.connect(uri).then((res) => {
    console.log("connected");
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


let index_val = 0;
const songs = JSON.parse(fs.readFileSync('songs.json'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true}));

app.get("/", async (req, res) => {
    if (req.session.isAuth) {
        const user = await UserModel.findById(req.session.userId);
        res.render('index', {link: "#", username: user["username"], songName: songs[index_val]["songName"], artist: songs[index_val]["artist"], data: songs, index: index_val});
    }
    else {
        res.render('index', {link: "./signup", username: "Login", songName: songs[index_val]["songName"], artist: songs[index_val]["artist"], data: songs, index: index_val});
    }

    console.log(req.session.userId);
})

const isAuthenticated = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.redirect("./signup");
    }
  }

app.get("/preferences", isAuthenticated, async (req, res) => {
   const user = await UserModel.findById(req.session.userId);
    res.render('preferences', {username: user["username"]});
})

app.get("/signup", (req, res) => {
    res.render('signup');
})

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    user = new UserModel({
        username,
        email,
        password
    })

    await user.save();

    req.session.userId = user._id;
    req.session.isAuth = true;
    res.redirect("./");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.userId = user._id;
    req.session.isAuth = true;

    res.redirect('/');
})

app.get("/getfavoritesongs", async (req, res) => {
    const user = await UserModel.findById(req.session.userId);
    res.json(user);

})

app.post("/addsongtofavorites", async (req, res) => {
    const { song } = req.body;
    const user = await UserModel.findById(req.session.userId);
    console.log(user);
    user.favoriteSongs.push(song);

    await user.save();
})

app.post("/removefavoritesong", async (req, res) => {
    const { song } = req.body;

    const user = await UserModel.findById(req.session.userId);
    user.favoriteSongs.remove(song);

    await user.save();
})

app.get("/listsongs", async (req, res) => {
    const songs  = await SongsModel.find();
    res.json(songs);
});

app.get("/setqueue", async (req, res) => {
    const user = await UserModel.findById(req.session.userId);
    user.queuedSongs = user.favoriteSongs;

    await user.save;
})

app.get("/getSong", async (req, res) => {
    const user = await UserModel.findById(req.session.userId);
    
    res.json({ song: songs[index_val], index: index_val });
  });


app.post("/songDone", (req, res) => {
    index_val = req.body.index; 
});

app.post("/logout", async (req, res) => {

})

let port = 8080;
app.listen(port, () => {
 console.log("Server running at port= " + port);
});

