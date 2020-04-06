const jwt = require("jsonwebtoken");
const crypto = require('crypto');

module.exports = function(username){
    const payload = {
        user:username,
        etoken: {
            etoken: crypto.randomBytes(20).toString('hex')
        }
    };

    var token = jwt.sign(
        payload,
        "WikiWhere", {
            expiresIn: 100000
        }
    );
    return token;
}