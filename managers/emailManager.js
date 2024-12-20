const nodemailer = require("nodemailer");
const emailManager = async (to, text, html, subject) => {
  //using nodemailer
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c8c4d8673c633f",
      pass: "e86b1a3dc9e209",
    },
  });

  //send mail to customer
  await transport.sendMail({
    to: to,
    from: "trianhnguyen05@gmail.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
