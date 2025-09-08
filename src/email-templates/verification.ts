const verification = `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px;">
      <h2 style="color: #1a73e8;">Verify Your Email with AuthHook</h2>
      
      <p>Hi {{user_name}},</p>

      <p>Thanks for signing up for <strong>AuthHook</strong> – the secure authentication API built for modern applications.</p>

      <p>Use the verification code below to complete your sign-up:</p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 28px; font-weight: bold; color: #1a73e8; letter-spacing: 4px;">
          {{verification_code}}
        </span>
      </div>

      <p>This code will expire in {{code_expiry_time}} minutes.</p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 14px; color: #888;">
        AuthHook is a production-ready authentication service designed to help developers integrate multi-tenant, enterprise-grade user authentication and API key management quickly and securely.
      </p>

      <p style="font-size: 13px; color: #aaa;">
        If you didn’t request this code, you can safely ignore this email.
      </p>

      <p style="font-size: 13px; color: #aaa;">
        — The AuthHook Team
      </p>
    </div>
  </body>
</html>
`;
export default verification;
