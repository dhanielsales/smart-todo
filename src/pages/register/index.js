async function handleRegister(event) {
  event.preventDefault()
  const form = event.target

  const name = form["name"].value
  const surname = form["surname"].value
  const birthday = form["birthday"].value
  const email = form["email"].value
  const password = form["password"].value
  const confirmpassword = form["confirmpassword"].value

  if (password !== confirmpassword) {
    alert("Senha e confirmação de senha são diferentes")
  }

  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      surname: surname,
      birthday: birthday,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    })
  })
}

const form = document.getElementById("registerForm")
form.addEventListener("submit", handleRegister)
