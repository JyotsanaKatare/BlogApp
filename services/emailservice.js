
var nodemailer = require('nodemailer');

const sendEmail = async (userEmail, token, id) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jyotsanakatare63@gmail.com",
            pass: "gegofjrrcxfygnpd"
        }
    });

    //send out mail through nodemailer
    var mailOptions = {
        from: "jyotsanakatare63@gmail.com",
        to: userEmail,
        subject: "password reset",
        html: `<p> You have request for password reset </p>
        <h5>click in this <a> href = "http://127.0.0.1:7000/reset/${id}/${token}">link </a> to reset password</h5>`
    }
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully")
        }
    });
}

module.exports = {
    sendEmail
}
