const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function replaceContent(content, creds) {
  let allkeysArr = Object.keys(creds);
  allkeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");
    const msg = {
      to: receiverEmail,
      from: "vdazzler6@gmail.com", // must be a verified sender in SendGrid
      subject: "Mail from bookShows",
      text: `Hi ${creds.name}, please see the details below.`,
      html: replaceContent(content, creds),
    };
    await sgMail.send(msg);
    console.log("email sent");
  } catch (err) {
    console.error(err.response?.body || err.message);
  }
}

module.exports = EmailHelper;
