
export const getEmailTemplate = (verificationURL: string,user : any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#2563eb;padding:20px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;color:#333333;">
              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
                Hello ${user.name},
              </p>

              <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${verificationURL}"
                  style="background:#2563eb;color:#ffffff;text-decoration:none;
                         padding:14px 24px;border-radius:6px;
                         font-size:16px;display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px;line-height:1.6;color:#555;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all;font-size:14px;color:#2563eb;">
                ${verificationURL}
              </p>

              <p style="font-size:14px;color:#777;margin-top:30px;">
                This link will expire in 24 hours.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f6f8;padding:20px;text-align:center;font-size:12px;color:#888;">
              © ${new Date().getFullYear()} Your App Name. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
