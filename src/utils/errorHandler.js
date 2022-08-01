import Ajv from "ajv";
import addFormats from "ajv-formats";
import { schema } from "./payloadSchema.js";
const headers = {
  "content-type": "application/json",
};
class HttpError extends Error {
  constructor(statusCode, body = {}) {
    super(JSON.stringify(body));
  }
}

/**
 * Exception Handling
 * @param e
 * @returns
 */
export const handleError = (e) => {
  if (e instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: `invalid request body format : "${e.message}"`,
      }),
    };
  }

  if (e instanceof HttpError) {
    console.log({
      statusCode: e.statusCode,
      headers,
      body: e.message,
    });
    return {
      statusCode: e.statusCode,
      headers,
      body: e.message,
    };
  }

  throw e;
};

/**
 * Validates payload schema (email validation)
 * Payload schema is defined in /src/utils/payloadSchema.js
 * Schema assumed:
 * { "to" : [
      { "email": "to1@email.com", "name": "name1" },
      { "email": "to2@email.com", "name": "name2" },
      { "email": "to3@email.com", "name": "name3" }
    ],
    "cc": [
      { "email": "cc1@email.com", "name": "name1" },
      { "email": "cc2@email.com", "name": "name2" },
      { "email": "cc3@email.com", "name": "name3" }
    ],
    "bcc": [
      { "email": "bcc1@email.com", "name": "name1" },
      { "email": "bcc2@email.com", "name": "name2" },
      { "email": "bcc3@email.com", "name": "name3" }
    ],
    "subject": "email subject for testing",
    "text": "This is the body of the email in text format only"
  }
 * @param {*} payload
 * @returns
 */
export const validateSchema = async (payload) => {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(payload);

  if (!valid) {
    const error = new HttpError(401, {
      message: validate.errors,
      //message: "invalid payload - check email addresses",
    });

    const err = handleError(error);
    return err;
  } else return true;
};
