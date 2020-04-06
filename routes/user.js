const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const emailauth = require("../middleware/emailauth");
const generateEmailtoken = require("../middleware/generateEmailToken");

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/signup",
    async (req, res) => {
        const {
            username,
            password,
            email,
            vtoken,
            isVerified
        } = req.body;
        try {
            let user = await User.findOne({
                username
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            
            //Hashes the passwords
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password.trim(), salt);
            const etoken = generateEmailtoken(username);
            user = new User({
                username,
                password:hashedPassword,
                email,
                vtoken:etoken,
                isVerified:false
            });

            await user.save();

            //The payload is what we wanna carry over when doing request
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "ILikeTurtles", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    //The token gets returned here
                    res.status(200).json({
                        token
                    });
                }
            );
            
            emailauth(user, etoken);

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */

router.post(
    "/login",
    async (req, res) => {
        const {
            username, 
            password,
            email
        } = req.body;
        
        try {
            let user = await User.findOne({
                username
            });
            
            if(!user)
                return res.status(400).json({
                    message: "Username not found"
                });
            
            //This rehashes the password to compare with the hashed password in the db
            const checkPassword = await bcrypt.compare(password, user.password);
            
            if(!checkPassword)
                return res.status(400).json({
                    message: "Incorrect Password"
                });
            
            const payload = {
                user: {
                    id: user.id
                }
            };
            
            //This signs the payload 
            jwt.sign(
                payload,
                "ILikeTurtles",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    //The token gets returned here
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /me
 */


router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from the auth function defined in middleware
      // after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });
  
module.exports = router;
