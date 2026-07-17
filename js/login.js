const formulario = document.getElementById("form_login");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("usuario").value;
  const password = document.getElementById("contraseña").value;
  const respuesta = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, password }),
  });

  const data = await respuesta.json();

  if (data.ok) {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    alert("Bienvenido " + data.usuario.nombres);

    window.location.href = "index.html";
  } else {
    alert(data.mensaje);
  }
});

const verPassword = document.getElementById("verPassword");
const password = document.getElementById("contraseña");

verPassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    verPassword.textContent = "👁️";
  } else {
    password.type = "password";
    verPassword.textContent = "👁️";
  }
});
