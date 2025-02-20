const express = require("express");
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db.js")
const asyncHandler = require('express-async-handler')

db.initDb()
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors())

const port = 3000
const token = "cd6d1029-466c-4368-bc97-62b9e1e83850"

server.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "src", "pages", "login", "index.html",))
});

server.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "src", "pages", "register", "index.html",))
});

server.post("/api/register", asyncHandler(async (request, response) => {
  const { body } = request

  if (!body.name || !body.surname || !body.birthday || !body.email || !body.password) {
    return response.status(400).send({ message: "requisicao invalida" })
  }

  return await db.createUser(body)
}));

server.post("/api/login", asyncHandler(async (request, response) => {
  const { body } = request

  if (!body.email || !body.password) {
    return response.status(400).json({ message: "requisicao invalida" })
  }

  const user = await db.getUserByEmail(body.email)

  if (!user) {
    return response.status(400).json({ message: "usuario ou senha errado" })
  }

  if (user.password !== body.password) {
    return response.status(400).json({ message: "usuario ou senha errado" })
  }

  return {
    user,
    token
  }
}));

server.listen(port, () => console.log(`Servidor iniciado: http://localhost:${port}`));
