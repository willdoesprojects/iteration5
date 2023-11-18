const UserModel = require("../models/Users");

const homePageHandler = async (req, res) => {
    if (!req.session.index) {
        req.session.index = 0;
    }


    if (req.session.isAuth) {
        
        const user = await UserModel.findById(req.session.userId);

        if (user.queuedSongs.length === 0) {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: "Hello", artist: "Please add songs to begin."});
        }
        
        else {
            res.render('index', {func: "logOut()", link: "#", username: user["username"], songName: user["queuedSongs"][req.session.index]["name"], artist: user["queuedSongs"][req.session.index]["artist"]});

        }
        
    }
    else {
        res.render('index', {func: "", link: "./signup", username: "Login", songName: "Welcome!", artist: "Please Login to Get Started."});
    }
}


const getSongQueueHandler = async (req, res) => {
    const user = await UserModel.findById(req.session.userId);

    if (user == null) {
        res.json(null);
    }
    
    else {
        res.json({queuedSongs: user.queuedSongs, index: req.session.index});
    }
    
};

const getIndexIncrHandler = async (req, res) => {
    const { index } = req.body;
    req.session.index = index;
    res.redirect("/");
    
}

const getIndexDecrHandler = async (req, res) => {
    const { index } = req.body;
    req.session.index = index;
    res.redirect("/");
    
}




module.exports = { homePageHandler, getSongQueueHandler, getIndexIncrHandler, getIndexDecrHandler };


