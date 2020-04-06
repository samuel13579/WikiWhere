const express = require("express");
const router = express.Router();


const User = require("../model/User");

router.post('/verify/:token', 
    async (req,res) => {
        if(!req.params.token)
            return res.status(400).json({message: "We are unable to find a user for this token"});
        try {
            // Find a matching token
            const token = await User.findOne({ vtoken: req.params.token });
        
            if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });
        
            // Token found, get user
            User.findOne({ vtoken: req.params.token}, (err, user) => {
                if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });
        
                if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });
        
                // Verify and save the user
                user.isVerified = true;
                user.save(function (err) {
                    if (err) return res.status(500).json({message:err.message});
        
                    res.status(200).send("The account has been verified. Please log in.");
                });
            });
        } catch (error) {
            res.status(500).json({message: error.message})
        }   
    }
);

module.exports = router;