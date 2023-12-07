const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("database connection established 🔥");
    app.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  } catch (err) {
    console.log("database connection failed: ⚠️");
    console.log(err);
  }
}

const userCollection = client.db("proxyReact").collection("user");

const app = express();

app.use(express.json());

app.use(express.static("dist"));

app.get("/api/users", async (req, res) => {
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

app.post("/api/users", async (req, res) => {
  const { username, email } = req.body;
  console.log(username, email);
  const user = await userCollection.insertOne({ username, email });
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

app.get("/health", (req, res) => {
  res.send("Health is good");
});

// Handle all routes and serve the main HTML file
app.get("*", (__, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

run();
