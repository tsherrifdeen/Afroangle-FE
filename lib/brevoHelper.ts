const BREVO_API_KEY = process.env.BREVO_API_KEY;
const senderEmail = "editorial@afroangle.com";
// Helper function to send email to editorial team
export async function sendEmailNotification(
  authorName: string,
  authorEmail: string,
  fileName: string,
) {
  const emailData = {
    sender: {
      name: "Afroangle Notification",
      email: senderEmail,
    },
    to: [
      {
        email: senderEmail,
        name: "Israel Winlade",
      },
    ],
    subject: `New Opinion Piece Submission: ${authorName}`,
    htmlContent: `
    <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Submission Received</title>
      </head>

      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 30px 0;">
          <tr>
            <td align="center">
              <table width="580" cellpadding="0" cellspacing="0" border="0"
                style="background-color: #ffffff; border-radius: 4px; overflow: hidden;">

                <!-- HEADER / LOGO -->
                <tr>
                  <td align="center" style="padding: 28px 40px; background-color: #F4F4F4;">
                    <img src="https://afroangle.com/afroangle-logo.svg" alt="Afroangle" width="140"
                      style="display: block; border: 0; outline: none; text-decoration: none;" />
                  </td>
                </tr>

                <!-- BODY CONTENT -->
                <tr>
                  <td style="padding: 36px 40px; color: #222222; font-size: 15px; line-height: 1.75;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">

                      <tr>
                        <td style="padding-bottom: 20px; font-size: 20px; font-weight: bold; color: #1a1a1a;">
                          New Submission Received
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px; color: #555555; font-size: 15px;">
                          A new opinion piece has been uploaded to Sanity.
                        </td>
                      </tr>

                      <!-- Divider -->
                      <tr>
                        <td style="padding-bottom: 20px; border-top: 1px solid #eeeeee;"></td>
                      </tr>

                      <!-- Author Details -->
                      <tr>
                        <td style="padding-bottom: 12px; font-size: 15px; color: #222222;">
                          <strong>Author:</strong>&nbsp; ${authorName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px; font-size: 15px; color: #222222;">
                          <strong>Email:</strong>&nbsp; ${authorEmail}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px; font-size: 15px; color: #222222;">
                          <strong>File Name:</strong>&nbsp; ${fileName}
                        </td>
                      </tr>

                      <!-- Divider -->
                      <tr>
                        <td style="padding-bottom: 24px; border-top: 1px solid #eeeeee;"></td>
                      </tr>

                      <!-- CTA -->
                      <tr>
                        <td style="padding-bottom: 28px; font-size: 15px; color: #222222;">
                          You can view and download this submission in the Sanity Studio.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="https://afroangle.com/admin" style="display: inline-block; background-color: #055b33; color: #ffffff; font-size: 14px;
                            font-weight: bold; text-decoration: none; padding: 12px 28px;">
                            Open Sanity Studio
                          </a>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #F4F4F4; padding: 28px 40px; text-align: center;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 12px;">
                          <img src="https://afroangle.com/afroangle-logo.svg" alt="Afroangle" width="120"
                            style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 10px; font-size: 13px; font-style: italic;">
                          The African lens for all global issues
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>

      </html>
    `,
  };

  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY || "",
      "content-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });
}

// Helper function to send confirmation email to the author
export async function sendAuthorConfirmation(
  authorName: string,
  authorEmail: string,
) {
  const emailData = {
    sender: {
      name: "Afroangle Editorial Team",
      email: senderEmail,
    },
    to: [
      {
        email: authorEmail,
        name: authorName,
      },
    ],
    subject: `We've Received Your Submission`,
    htmlContent: `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Submission Received</title>
      </head>

      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:30px 0;">
          <tr>
            <td align="center">
              <table width="580" cellpadding="0" cellspacing="0" border="0"
                style="background-color: #ffffff; border-radius: 4px; overflow: hidden;">

                <!-- HEADER / LOGO -->
                <tr>
                  <td align="center" style="padding: 28px 40px; background-color: #F4F4F4;">
                    <img src="https://afroangle.com/afroangle-logo.svg" alt="Afroangle" width="140"
                      style="display: block; border: 0; outline: none; text-decoration: none;" />
                  </td>
                </tr>

                <!-- BODY CONTENT -->
                <tr>
                  <td style="padding: 36px 40px; color: #222222; font-size: 15px; line-height: 1.75;">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 18px; color: #222222; font-size: 15px; line-height: 1.75;">
                          Dear ${authorName},
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 18px; color: #222222; font-size: 15px; line-height: 1.75;">
                          Thank you for reaching out to Afroangle and for thinking of us as a home for your work.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 18px; color: #222222; font-size: 15px; line-height: 1.75;">
                          We have received your submission and our editorial team will review it carefully.
                          We aim to respond within <strong>three business days</strong>. In the meantime, please feel free
                          to send any additional context or supporting materials that might help us better understand
                          your angle.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 28px; color: #222222; font-size: 15px; line-height: 1.75;">
                          Afroangle is built on the strength and diversity of African voices. We are genuinely
                          glad you are part of that conversation.
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #222222; font-size: 15px; line-height: 1.75;">
                          Warm regards,<br />
                          <strong>The Editorial Team</strong><br />
                          Afroangle<br />
                          <a href="mailto:editorial@afroangle.com"
                            style="color: #222222; text-decoration: none;">editorial@afroangle.com</a><br />
                          <a href="https://www.afroangle.com"
                            style="color:#055b33;; text-decoration: none;">www.afroangle.com</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background-color: #F4F4F4; padding: 28px 40px; text-align: center;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 12px;">
                          <img src="https://afroangle.com/afroangle-logo.svg" alt="Afroangle" width="120"
                            style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom: 10px; font-size: 13px; font-style: italic;">
                          The African lens for all global issues
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size: 12px;">
                          <a href="https://x.com/theafroangle?s=11" style="text-decoration: none; color:#055b33;">X</a>
                          <span style="color: #666666; margin: 0 6px;">|</span>
                          <a href="https://www.instagram.com/afroangle1?igsh=emxhcjZ2YXcwM2Fl"
                            style="text-decoration: none; color:#055b33;">Instagram</a>
                          <span style="color: #666666; margin: 0 6px;">|</span>
                          <a href=https://www.facebook.com/profile.php?id=61586718135148&mibextid=wwXIfr"
                            style="text-decoration: none; color:#055b33;">Facebook</a><span
                            style="color: #666666; margin: 0 6px;">|</span>
                          <a href="https://www.linkedin.com/company/afroangle/"
                            style="text-decoration: none; color:#055b33;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
      </html>
    `,
  };

  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY || "",
      "content-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });
}
