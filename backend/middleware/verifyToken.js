const verifyToken = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const url = "https://www.google.com/recaptcha/api/siteverify";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  if (!res.ok) {
    throw new Error(`reCAPTCHA verification failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

module.exports = verifyToken;
