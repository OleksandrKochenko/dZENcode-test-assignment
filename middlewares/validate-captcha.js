const axios = require("axios");
const { CAPTCHA_SECRET_KEY, CAPTCHA_VERIFY_URL } = process.env;
const httpError = require("../helpers/http-error");

const reCaptcha = async (req, res, next) => {
  try {
    const { body } = req;
    const captchaToken = body["g-recaptcha-response"];
    if (
      captchaToken === undefined ||
      captchaToken === null ||
      captchaToken === ""
    ) {
      throw httpError(400, "Validate reCAPTCHA first");
    }
    const verificationUrl = `${CAPTCHA_VERIFY_URL}?secret=${CAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const { data } = await axios.post(verificationUrl);
    if (!data.success) {
      throw httpError(400, "reCAPTCHA validation has failed");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = reCaptcha;
