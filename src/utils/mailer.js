import { mailgun } from "../utils/mailgun.js";
import { sendgrid } from "../utils/sendgrid.js";
const headers = {
  "content-type": "application/json",
};
/**
 * generate <to>,<cc>,<bcc> in format "to1@email.com;to2@email.com;to3@email.com;"
 * Required for Mailgun API
 * @param {*} data 
 * @returns 
 */
const formatList = (data) => {
  let emailList = "";
  data.map((value) => {
    emailList += value.email + ";";
  });
  return emailList;
};

/**
 * sendMail sends email first via sendGrid API if it fails then sends email via mailGun 
 * @param {*} data 
 * @returns 
 */
export const sendMail = async (data) => {
  const { to, cc, bcc, subject, text } = data;
  const isSend = await sendgrid(to, cc, bcc, subject, text);
  if (isSend !== true) {
    console.log("sendGrid failed to send email, MailGun is sending email now");
    const resp = await mailgun(
      formatList(to),
      formatList(cc),
      formatList(bcc),
      subject,
      text
    );
    return resp;
  }
};
