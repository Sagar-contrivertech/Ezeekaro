const nodemailer = require('nodemailer')

const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "sagar@contrivertech.com",
            pass: "Sagar@123"
        }
    });

    const mailOptions = {
        from: "info@contrivertech.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail
