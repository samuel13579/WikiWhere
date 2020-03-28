const express = require('express');
const router = express.Router();

const User = require("../model/User");

router.post('signup', async(req,res) => {
    const {
        username,
        password,
        email
    } = req.body;


    user = new User({
        username,
        password,
        email
    })

    await user.save();
})