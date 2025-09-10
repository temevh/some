const https = require("https");

/**
 * Verifies Google reCAPTCHA v3 token using siteverify endpoint.
 * Expects token in req.body.recaptchaToken
 */
module.exports = async function verifyRecaptcha(req, res, next) {
  try {
    const token = req.body?.recaptchaToken;
    if (!token) {
      return res.status(400).json({ message: "reCAPTCHA token missing" });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.warn("RECAPTCHA_SECRET_KEY not set; skipping verification");
      return next();
    }

    const postData = `secret=${encodeURIComponent(
      secret
    )}&response=${encodeURIComponent(token)}`;

    const data = await new Promise((resolve, reject) => {
      const reqVerify = https.request(
        {
          method: "POST",
          hostname: "www.google.com",
          path: "/recaptcha/enterprise/siteverify",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData),
          },
        },
        (resp) => {
          let body = "";
          resp.on("data", (chunk) => (body += chunk));
          resp.on("end", () => {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(e);
            }
          });
        }
      );
      reqVerify.on("error", reject);
      reqVerify.write(postData);
      reqVerify.end();
    });

    if (!data.success) {
      return res.status(403).json({ message: "reCAPTCHA verification failed" });
    }

    if (typeof data.score === "number" && data.score < 0.3) {
      return res.status(403).json({ message: "reCAPTCHA score too low" });
    }

    return next();
  } catch (err) {
    console.error("reCAPTCHA verification error", err);
    return res.status(500).json({ message: "reCAPTCHA verification error" });
  }
};
