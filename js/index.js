const usuario = JSON.parse(localStorage.getItem("usuario"));

const botonLogin = document.getElementById("botonLogin");
const botonCerrar = document.getElementById("botonCerrar");

if (usuario) {
  // Ocultar iniciar sesión
  botonLogin.style.display = "none";

  // Mostrar cerrar sesión
  botonCerrar.style.display = "block";
}

botonCerrar.addEventListener("click", () => {
  localStorage.removeItem("usuario");

  window.location.href = "login.html";
});
