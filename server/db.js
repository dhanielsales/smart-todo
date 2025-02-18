const path = require('node:path');
const fs = require('node:fs/promises');
const fsSync = require('node:fs');

const DATA_FILE = path.join(path.resolve(path.dirname(__filename)), "data.json")
const INITIAL_DATA = JSON.stringify({
  users: [],
  items: [],
})

function initDb() {
  if (!fsSync.existsSync(DATA_FILE)) {
    fsSync.writeFileSync(DATA_FILE, INITIAL_DATA);
  }
}

async function getUsers() {
  const [dataString, error] = await safeAwait(fs.readFile(DATA_FILE, { encoding: 'utf8' }));

  if (error) {
    return error
  }

  const data = JSON.parse(dataString)
  return data.users
}

async function getUserByEmail(email) {
  const [dataString, error] = await safeAwait(fs.readFile(DATA_FILE, { encoding: 'utf8' }));

  if (error) {
    return error
  }

  const data = JSON.parse(dataString)
  return data.users.find(item => item.email === email)
}

async function createUser(user) {
  const [dataString, error] = await safeAwait(fs.readFile(DATA_FILE, { encoding: 'utf8' }));

  if (error) {
    return error
  }

  const data = JSON.parse(dataString)

  const alreadyExists = data.users.find(item => item.email === user.email)

  if (alreadyExists) {
    return new Error("usuario ja existe")
  }

  const newUser = {
    id: data.users.length + 1,
    name: user.name,
    surname: user.surname,
    birthday: user.birthday,
    email: user.email,
    password: user.password,
  }

  data.users.push(newUser)

  const [_, error2] = await safeAwait(fs.writeFile(DATA_FILE, JSON.stringify(data)));

  if (error2) {
    return error2
  }

  return newUser
}

async function safeAwait(promise) {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}

module.exports = { safeAwait, initDb, getUsers, getUserByEmail, createUser }