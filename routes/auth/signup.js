const express = require("express");
const authRoutes = express.Router();
// User model
const User = require("../../models/user");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
    res.render("signup");
});

authRoutes.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Validation
    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "Indicate a username and a password to sign up"
        });
        return;
    }
    //Check if the user already exist
    User.findOne({
            "username": username
        },
        "username",
        (err, user) => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The username already exists"
                });
                return;
            }

            var salt = bcrypt.genSaltSync(bcryptSalt);
            var hashPass = bcrypt.hashSync(password, salt);

            var newUser = User({
                username,
                password: hashPass
            });
            //Save the user
            newUser.save((err) => {
                res.redirect("/");
            });
        });




});

module.exports = authRoutes;