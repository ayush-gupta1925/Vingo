import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
   host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465
  auth: {
    user: process.env.USER_EMAIL, // Gmail ID
    pass: process.env.USER_PASSWORD // App Password
  }
});
console.log(process.env.USER_EMAIL)
console.log(process.env.USER_PASSWORD)
export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL, // ✅ "from" not "form"
    to: to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
  });
};

// export const sendDeliveryOtpMail = async (user, otp) => {
//   await transporter.sendMail({
//     from: process.env.USER_EMAIL, // ✅ "from" not "form"
//     to: user.email,
//     subject: "Delivery Otp",
//     html: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
//   });

// };


export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Delivery OTP",
      html: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    });
    console.log("OTP sent successfully to", user.email);
  } catch (error) {
    console.error("Failed to send OTP:", error.message);
    throw new Error("Failed to send OTP");
  }
};


