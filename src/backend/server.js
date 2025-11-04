const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const FILE_PATH = "./tasks.json";

app.use(cors());
app.use(bodyParser.json());


app.get("/tasks", (req, res) => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ todo: [], inProgress: [], done: [] }, null, 2));
  }
  const data = fs.readFileSync(FILE_PATH);
  res.json(JSON.parse(data));
});

app.post("/tasks", (req, res) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(req.body, null, 2));
  res.json({ message: "Tasks saved" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
