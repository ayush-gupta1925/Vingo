// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();
// import axios from "axios";

// const transporter = nodemailer.createTransport({
//    service: "gmail",
//   port: 587,
//   secure: false, // true for 465
//   auth: {
//     user: process.env.USER_EMAIL, // Gmail ID
//     pass: process.env.USER_PASSWORD // App Password
//   }
// });

// export const sendOtpMail = async (to, otp) => {
//   await transporter.sendMail({
//     from: process.env.USER_EMAIL, // ✅ "from" not "form"
//     to: to,
//     subject: "Reset Your Password",
//     html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
//   });
// };

// // export const sendDeliveryOtpMail = async (user, otp) => {
// //   await transporter.sendMail({
// //     from: process.env.USER_EMAIL, // ✅ "from" not "form"
// //     to: user.email,
// //     subject: "Delivery Otp",
// //     html: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
// //   });

// // };


// export const sendDeliveryOtpMail = async (user, otp) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.USER_EMAIL,
//       to: user.email,
//       subject: "Delivery OTP",
//       html: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     });
//     console.log("OTP sent successfully to", user.email);
//   } catch (error) {
//     console.error("Failed to send OTP:", error.message);
//     throw new Error("Failed to send OTP");
//   }
// };




import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Simple Gmail SMTP transporter (works on dev & prod)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",         // Gmail SMTP server
  port: 587,                      // 587 for TLS, 465 for SSL
  secure: false,                  // false for 587, true for 465
  auth: {
    user: process.env.USER_EMAIL,     // Gmail ID
    pass: process.env.USER_PASSWORD   // Gmail App Password (2FA enabled)
  }
});

export const sendOtpMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    });
    console.log("OTP sent successfully to", to);
  } catch (error) {
    console.error("Failed to send OTP:", error.message);
    throw new Error("Failed to send OTP");
  }
};

export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Delivery OTP",
      html: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
    });
    console.log("Delivery OTP sent successfully to", user.email);
  } catch (error) {
    console.error("Failed to send Delivery OTP:", error.message);
    throw new Error("Failed to send Delivery OTP");
  }
};


// export const sendDeliveryOtpMail = async (user, otp) => {
//   try {
//     await axios.post(
//       "https://api.sendinblue.com/v3/smtp/email",
//       {
//         sender: { name: "Shopnity", email: process.env.USER_EMAIL },
//         to: [{ email: user.email, name: user.fullName }],
//         subject: "Delivery OTP",
//         htmlContent: `<p>Your OTP for Delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`,
//       },
//       {
//         headers: {
//           "api-key": process.env.USER_PASSWORD,
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//       }
//     );
//     console.log("OTP sent successfully via Sendinblue API to", user.email);
//   } catch (error) {
//     console.error("Failed to send OTP via API:", error.message);
//     throw new Error("Failed to send OTP");
//   }
// };

