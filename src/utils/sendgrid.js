import axios from "axios";

const SENDGRID_API_URL = process.env.SENDGRID_API_URL;
const SENDGRID_AUTH_TOKEN = process.env.SENDGRID_AUTH_TOKEN;
const SENDGRID_MAIL_FROM = process.env.SENDGRID_MAIL_FROM;

/**
 * sendgrid API call
 * @param {*} to 
 * @param {*} cc 
 * @param {*} bcc 
 * @param {*} subject 
 * @param {*} text 
 * @returns 
 */
export const sendgrid = async (to, cc, bcc, subject, text) => {
  var data = JSON.stringify({
    personalizations: [
      {
        to,
        cc,
        bcc,
      },
      {
        from: SENDGRID_MAIL_FROM,
      },
    ],
    subject,
    content: [
      {
        type: "text/html",
        value: text,
      },
    ],
    ip_pool_name: "transactional email",
  });
  const config = {
    method: "post",
    url: SENDGRID_API_URL,
    headers: {
      Authorization: SENDGRID_AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const resp = await axios(config);
    if (resp) return true;
    return false;
  } catch (e) {
    return false;
  }
};
