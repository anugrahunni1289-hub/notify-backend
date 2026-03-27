const express = require("express");
const app = express();

app.use(express.json());

// Temporary storage (later we use database)
let users = [];
let connections = [];

// ✅ Home
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Register/Login
app.post("/login", (req, res) => {
  const { username, email } = req.body;

  let user = users.find(u => u.email === email);

  if (!user) {
    user = { id: Date.now(), username, email };
    users.push(user);
  }

  res.json(user);
});

// ✅ Generate Pair Code
app.get("/generate-code/:userId", (req, res) => {
  const code = Math.random().toString(36).substring(2, 8);
  connections.push({ code, userId: req.params.userId });

  res.json({ code });
});

// ✅ Join using Code
app.post("/join", (req, res) => {
  const { code, userId } = req.body;

  const connection = connections.find(c => c.code === code);

  if (!connection) {
    return res.status(404).send("Invalid code");
  }

  connection.user2 = userId;

  res.send("Connected successfully");
});

// ✅ Send Notification
app.post("/notify", (req, res) => {
  const { fromUser, toUser } = req.body;

  console.log(`${fromUser} is here for ${toUser}`);

  res.send("Notification sent");
});

app.listen(3000, () => {
  console.log("Server started");
});
