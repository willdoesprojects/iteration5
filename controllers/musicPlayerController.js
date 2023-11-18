const UserModel = require("../models/Users");

const homePageHandler = async (req, res) => {
    if (!req.session.index) {
        req.session.index = 0;
    }

    console.log(req.session.index);
    req.session.isAuth = true;

    if (req.session.isAuth) {
        
        const user = await UserModel.findById("6557fdad318815885c10e254");

        if (user.queuedSongs.length === 0) {
            res.render('index', {link: "#", username: user["username"], songName: "Hello", artist: "Please add songs to begin.", data: [], index: 0});
        }
        
        else {
            
            res.render('index', {link: "#", username: user["username"], songName: user["queuedSongs"][req.session.index]["name"], artist: user["queuedSongs"][req.session.index]["artist"], data: user.queuedSongs, index: req.session.index});

        }
        
    }
    else {
        res.render('index', {link: "./signup", username: "Login", songName: "Welcome!", artist: "Please Login to Get Started.", data: [], index: 0});
    }
}


const getSongQueueHandler = async (req, res) => {
    const user = await UserModel.findById("6557fdad318815885c10e254");
    if (user == null) {
        res.json(null);
    }
    
    else {
        res.json(user.queuedSongs);
    }
    
};

const getIndexIncrHandler = async (req, res) => {
    
}

const getIndexDecrHandler = async (req, res) => {
    req.session -= 1;
}



module.exports = { homePageHandler, getSongQueueHandler, getIndexIncrHandler, getIndexDecrHandler };


