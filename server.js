const express = require("express");
const session = require("express-session");

const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");



app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));




app.use(session({
    secret: 'key that will be',
    resave: true,
    saveUninitialized: false
}))


let index_val = 0;
const songs = JSON.parse(fs.readFileSync('songs.json'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.get("/", (req, res) => {
    req.session.isAuth = true;
    console.log(req.session);
    res.render('index', {songName: songs[index_val]["songName"], artist: songs[index_val]["artist"], data: songs, index: index_val});
})

app.get("/getSong", (req, res) => {
    res.json({ song: songs[index_val], index: index_val });
  });


app.post("/songDone", (req, res) => {
    index_val = req.body.index; 
});


let port = 8080;
app.listen(port, () => {
 console.log("Server running at port= " + port);
});

