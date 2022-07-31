const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlewares/check-auth');

//Register

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // console.log(req);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        try {
            const isUserExist = await User.findOne({email: req.body.email});

            if (isUserExist) {
                res.status(401).json("User Already Exist !");
            }

            const user = await newUser.save();
            if (!user) res.status(500).json("Error Creating User");

            const {password, ...others} = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Login 

router.post("/login", async (req, res) => {
    // console.log(req.body);
    try {

        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) res.status(400).json("Wrong Email");

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) res.status(400).json("Wrong Password");

        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1s" }
        );
        res.cookie('jwt-token', token, {httpOnly: true});
        
        res.status(200).json({
            token: token,
            email: user.email,
            userId: user._id
        });
        
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;