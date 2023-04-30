"use strict";
const nodemailer = require("nodemailer");
module.exports = async function Notify(req, res) {

try {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type:'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
      // accessToken:'https://oauth2.googleapis.com/token'
    },
  });

  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.MAIL_USERNAME,
  //     pass: process.env.MAIL_PASSWORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
  //   }
  // });

  let info = await transporter.sendMail({
    from: '"Eyootube 👻" <amanab.449@gmail.com>',
    to: "amanuel.abay@hahu.jobs",
    subject: "🕝 tic tac",
    text: "Hello world?", 
    html: `<b>Hey, <br/> From Eyootube 🤗 🤗 it's time to answer questions tic tac tic tac 🕝 30 minutes left</b>`, 
  });

  // let mailOptions = {
  //   from: 'tomerpacific@gmail.com',
  //   to: 'tomerpacific@gmail.com',
  //   subject: 'Nodemailer Project',
  //   text: 'Hi from your nodemailer project'
  // };

  // transporter.sendMail(mailOptions, function(err, data) {
  //   if (err) {
  //     console.log("Error " + err);
  //   } else {
  //     console.log("Email sent successfully");
  //   }
  // });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).send("done")
} catch (error) {
  res.status(500).send(error)
}

  
}

// Notify().catch(console.error);