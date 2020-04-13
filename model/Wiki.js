const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
var favWiki = new Schema({
    placeName: String,
        articleName: String,
        coordinates: {
            lat: String,
            lng: String
        },
        url: String,
  });*/

const WikiSchema = new Schema ({
    userid: {
        type: String,
        required: true
    },
    favorite: Schema.Types.Mixed
    
    
},{strict: false})


module.exports = mongoose.model('wiki', WikiSchema);