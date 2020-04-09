const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WikiSchema = new Schema ({
    userid: {
        type: String,
        required: true
    },
    wikifav: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('wiki', WikiSchema);