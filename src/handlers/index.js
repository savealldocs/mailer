import { sendMail } from "../utils/mailer.js";
//import { validateSchema } from "../utils/validator.js";
import { handleError, validateSchema } from "../utils/errorHandler.js";
const headers = {
  "content-type": "application/json",
};
export const emailHandler = async (event, context, callback) => {
  try {
    const payload = JSON.parse(event.body);
    const isValidPayload = await validateSchema(payload);
    if (isValidPayload !== true) {
      return {
        statusCode: 400,
        headers,
        body: isValidPayload,
        //body: "Invalid Payload - check email addresses",
      };
    }

    const { to, cc, bcc, subject, text } = payload;
    const resp = await sendMail({ to, cc, bcc, subject, text });
    if (resp === false)
      return {
        statusCode: 400,
        headers,
        body: "Mailer failed to send email using sendGrid & Mailgun!",
      };

    return {
      statusCode: 200,
      headers,
      body: "Email sent !",
    };
  } catch (e) {
    return handleError(e);
  }
};
