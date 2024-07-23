
require('dotenv').config();
const nodemailer = require('nodemailer');


async function sendOTP(email) {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Or your email service provider
        host: 'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: process.env.SENDER_EMAIL, // Your email address
            pass: process.env.SENDER_APP_PASS, // Your email password
        },
    });

    const mailOptions = {
        from: ` "Anonify verifier" ${process.env.SENDER_EMAIL}`,
        to: email,
        subject: 'OTP Verification for Anonify',
        text: `Your OTP is ${otp}`,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
            reject("email error: ", err);
          } else {
            resolve("email sent info: ", info);
          }
        });
      });
    return otp;
}

module.exports = {sendOTP};