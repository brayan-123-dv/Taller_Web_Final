// Espera que el HTML termine de cargar
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
  mostrarCantidadProductos();

  activarConfirmacionProductos();
}

// Cuenta los productos del menú
function mostrarCantidadProductos() {
  const productos = document.querySelectorAll(".producto");

  const texto = document.createElement("p");

  texto.textContent = "Productos disponibles: " + productos.length;

  texto.style.fontSize = "18px";
  texto.style.fontWeight = "bold";
  texto.style.marginTop = "20px";
  texto.style.color = "rgb(255, 255, 255)";

  document.querySelector(".bienvenida").appendChild(texto);
}

// Agrega la confirmación cuando se hace clic en un producto
function activarConfirmacionProductos() {
  const enlaces = document.querySelectorAll(".enlace-producto");

  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function (event) {
      const nombreProducto = enlace.querySelector("h3").textContent;

      const respuesta = confirm(
        "¿Desea realizar el pedido de " + nombreProducto + "?",
      );

      if (respuesta) {
        guardarUltimoProducto(nombreProducto);
      } else {
        event.preventDefault();
      }
    });
  });
}

// Guarda el último producto seleccionado
function guardarUltimoProducto(nombreProducto) {
  localStorage.setItem("productoSeleccionado", nombreProducto);
}
