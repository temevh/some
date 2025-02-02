const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courses");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/coursesInitial", courseRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
