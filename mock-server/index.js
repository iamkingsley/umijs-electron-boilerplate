const express = require("express");
const path = require("path");
const getMockMiddleware = require("create-mock-middleware");
var cors = require("cors");
const bodyParser = require("body-parser");

// require("dotenv").config();

let app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(getMockMiddleware(path.join(__dirname, "/")));

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.listen(port, err => {
  if (err) console.log("failed to listen");
});

console.log("Assemby API server started on: " + port);
