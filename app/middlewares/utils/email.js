const nodemailer = require("nodemailer");
const Exceptions = require("../../../errors/Exceptions");

const sendEmail = async (options) => {
  //create a transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //define the email options
    const mailOptions = {
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      //html:
    };
    //actually send the email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendEmail };
