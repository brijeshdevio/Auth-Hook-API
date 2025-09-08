import { sendEmail } from "../config";
import verification from "./verification";

const verificationEmail = async (name: string, email: string, code: string) => {
  const html = verification
    .replace("{{user_name}}", name)
    .replace("{{verification_code}}", code)
    .replace("{{code_expiry_time}}", "10");
  await sendEmail({ to: email, subject: "Verification Code", html });
};

export { verificationEmail };
