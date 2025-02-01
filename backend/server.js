const express = require("express");
const cors = require("cors");
const prisma = require("./prismaclient");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/get", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
