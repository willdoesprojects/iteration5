const express = require("express");
const router = express.Router();
const acctAuthController = require("../controllers/acctAuthController");

router.get("/signup", (req, res) => {
    res.render('signup');
})

router.post("/signup", acctAuthController.signUpHandler);

router.post("/login", acctAuthController.loginHandler);


module.exports = router;