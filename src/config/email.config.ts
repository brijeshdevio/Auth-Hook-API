import nodemailer from "nodemailer";
import envConfig from "./env.config";
import { logger } from "../utils";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ easier than host/port
  auth: {
    user: envConfig("EMAIL_USER"), // your Gmail address
    pass: envConfig("EMAIL_PASS"), // the 16-char App Password
  },
});

type SendEmail = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async (prop: SendEmail) => {
  try {
    return await transporter.sendMail({
      from: "AuthHook " + envConfig("EMAIL_USER"),
      to: prop.to,
      subject: prop.subject,
      html: prop.html,
    });
  } catch (error) {
    logger.error(
      `Error sending email: Email(${prop.to}) Time(${Date.now()}) ${error}`
    );
  }
};

export default sendEmail;
