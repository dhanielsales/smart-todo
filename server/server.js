const express = require("express");
const path = require("path");

const server = express();
const port = 3000

server.get("/login",(request, response) => {
  response.sendFile(path.join(__dirname, "..", "src", "pages", "login", "index.html", ))
});

server.get("/register",(request, response) => {
  response.sendFile(path.join(__dirname, "..", "src", "pages", "register", "index.html", ))
});

server.listen(port, () => console.log("Servidor iniciado"));
