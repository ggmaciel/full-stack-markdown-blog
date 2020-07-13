const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Models
const User = require("../../models/User");

////////////////////////////////
//Login User
//route ---- route /api/auth

router.post("/", (req, res) => {
    const { email, password } = req.body;

    //Validatation
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    User.findOne({ email }).then((user) => {
        if (!user)
            return res.status(400).json({ message: "User does not exists" });

        //Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });

            jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.handle,
                            email: user.email,
                            register_date: user.register_date,
                        },
                    });
                }
            );
        });
    });
});

////////////////////////////////
//Get user data
//route ----/api/auth/user

router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(401).json({ message: "Not signed up" });
        });
});

////////////////////////////////
//Read notifications
//route ----/api/auth/notifications
/////////////////////////////////////////Deprecated/////////////////////////////////////////

router.put("/notifications", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password -email")
        .then((user) => {
            user.notifications = 0;
            user.save();
            res.json("All notifications read");
        });
});

module.exports = router;
