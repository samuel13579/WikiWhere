const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");


const Wiki = require('../model/Wiki');
const User = require("../model/User");



//@route GET api/wiki/wiki/get
//@desc Get all wiki information
//@access Public

router.get('/wiki/get', auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id);

        Wiki.find({userid: user.id})
            .sort({first: 1})
            .then(wiki => res.json(wiki))

    } catch (e) {
        res.send({message: "Error in fetching user"});
    }
})

//@route POST api/wiki/wiki/add
//@desc Get all wiki information
//@access Public

router.post('/wiki/add', (req, res) => {
    const newWiki = new Wiki({
        userid: req.body.userid,
        favorite: req.body.favorite
    })

    newWiki.save()
    .then(wiki => res.json(wiki))
    .catch(console.log);
})


module.exports = router;