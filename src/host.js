const express = require("express");
const app = express();
const path = require("path");

console.log(__dirname + "/../answers.html");

app
  .get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname + "/../answers.html"))
  )
  .listen(8080, console.log("listeing on 8080"));
