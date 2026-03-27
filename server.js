const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.post("/notify", (req, res) => {
  const { user } = req.body;
  console.log(user + " is here!");
  res.send("Notification sent");
});

app.listen(3000, () => {
  console.log("Server started");
});
