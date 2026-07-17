const formulario = document.getElementById("form_Registro");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const nacimiento = document.getElementById("nacimiento").value;
  const genero = document.getElementById("genero").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  // Solo validación de contraseña
  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Nombres y apellidos (solo letras y espacios)
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;

  if (!regexNombre.test(nombres)) {
    alert("Ingrese un nombre válido.");
    return;
  }

  if (!regexNombre.test(apellidos)) {
    alert("Ingrese un apellido válido.");
    return;
  }

  const fechaNacimiento = new Date(nacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  if (edad < 18) {
    alert("Debe tener al menos 18 años para registrarse.");
    return;
  }

  const regexCorreo = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com)$/;

  if (!regexCorreo.test(correo)) {
    alert("Ingrese un correo válido.");
    return;
  }

  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;

  if (!regexPassword.test(password)) {
    alert(
      "La contraseña debe tener mínimo 5 caracteres y contener letras y números.",
    );
    return;
  }

  const datos = {
    nombres,
    apellidos,
    nacimiento,
    genero,
    correo,
    password,
  };

  const respuesta = await fetch("http://localhost:3000/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const data = await respuesta.json();

  if (data.ok) {
    alert("Registro exitoso");
    window.location.href = "login.html";
  } else {
    alert(data.mensaje);
  }
});

const verPassword = document.getElementById("verPassword");
const password = document.getElementById("password");

verPassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    verPassword.textContent = "👁️";
  } else {
    password.type = "password";
    verPassword.textContent = "👁️";
  }
});

const verPassword2 = document.getElementById("verPassword2");
const password2 = document.getElementById("password2");

verPassword2.addEventListener("click", () => {
  if (password2.type === "password") {
    password2.type = "text";
    verPassword2.textContent = "👁️";
  } else {
    password2.type = "password";
    verPassword2.textContent = "👁️";
  }
});
