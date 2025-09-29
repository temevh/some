const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courses");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("OK"));
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
