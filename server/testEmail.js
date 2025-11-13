
import dotenv from "dotenv";
import { sendEmail } from "./utils/sendEmail.js";
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "MISSING");


const test = async () => {
  const to = "navyam.it.24@nitj.ac.in"; // 👈 put your real email here
  const subject = "Test Email from RetireWell";
  const text = "Hi! This is a test email to verify your Nodemailer setup.";

  try {
    await sendEmail(to, subject, text);
    console.log("Email test successful!");
  } catch (err) {
    console.error(" Email test failed:", err);
  }
};

test();
