require('dotenv').config();
const sgMail = require('@sendgrid/mail');

module.exports = function(user, etoken) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const link = `www.localhost:5000/api/verify/${etoken}`
    const msg = {
        to: user.email,
        from: 'noreply@Wiki-Where.com',
        subject: 'Email Authentication',
        text: 'Email Authentication',
        html: `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
        <br><p>If you did not request this, please ignore this email.</p>`
    };
    sgMail.send(msg);
}
