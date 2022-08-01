import axios from "axios";
import FormData from "form-data";

const MAILGUN_API_URL = process.env.MAILGUN_API_URL;
const MAILGUN_BEARER_TOKEN = process.env.MAILGUN_BEARER_TOKEN;
const MAILGUN_MAIL_FROM = process.env.MAILGUN_MAIL_FROM;

/**
 * Mailgun API call
 * @param {*} to
 * @param {*} cc
 * @param {*} bcc
 * @param {*} subject
 * @param {*} text
 */
export const mailgun = async (to, cc, bcc, subject, text) => {
  var data = new FormData();
  data.append("from", MAILGUN_MAIL_FROM);
  data.append("to", to);
  data.append("cc", cc);
  data.append("bcc", bcc);
  data.append("subject", subject);
  data.append("text", text);

  const config = {
    method: "get",
    url: MAILGUN_API_URL,
    headers: {
      Authorization: MAILGUN_BEARER_TOKEN,
      ...data.getHeaders(),
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
