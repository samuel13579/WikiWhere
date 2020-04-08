const sgMail = require('@sendgrid/mail');

module.exports = function(user, etoken) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const link = `https://wiki-where.herokuapp.com/api/verify/${etoken}`
    const msg = {
        to: user.email,
        from: 'wikiwhere32816@gmail.com',
        subject: 'Email Authentication',
        text: 'Email Authentication',
        html: `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
        <br><p>If you did not request this, please ignore this email.</p>`
    };
    sgMail.send(msg).then(() => {
    }).catch((error) => {
        console.log('error', error);
    });
}