const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const commentRoute = require("./routes/comment");
const userRoute = require("./routes/user");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let dURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// mongoose connection to database
mongoose
  .connect(dURI)
  .then((result) =>
    app.listen(port, () => {
      console.log(`server running at http://${host}:${port}`);
    })
  )
  .catch((err) => console.log(err));

// middlewares and static files

// app.use(express.static("build"));
app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// routes
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
