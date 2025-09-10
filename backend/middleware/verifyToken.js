const verifyToken = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  console.log("secret", secret);
  console.log("Verifying token:", token.substring(0, 20) + "...");

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );

  const data = await response.json();
  console.log("Recaptcha response:", data);

  return data;
};

module.exports = verifyToken;
