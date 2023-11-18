const UserModel = require("../models/Users");

const signUpHandler = async (req, res) => {
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
};

const loginHandler = async (req, res) => {
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
}

module.exports = { signUpHandler, loginHandler };