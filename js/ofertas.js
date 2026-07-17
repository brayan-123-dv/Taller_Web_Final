document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
  mostrarCantidadOfertas();

  activarBotones();
}

function mostrarCantidadOfertas() {
  const ofertas = document.querySelectorAll(".tarjeta-oferta");

  const texto = document.createElement("p");

  texto.textContent = "Ofertas disponibles hoy: " + ofertas.length;

  texto.style.fontWeight = "bold";
  texto.style.fontSize = "18px";
  texto.style.marginTop = "15px";
  texto.style.color = "rgb(249, 249, 249)";

  document.querySelector(".encabezado-ofertas").appendChild(texto);
}

function activarBotones() {
  const botones = document.querySelectorAll(".btn-oferta");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function (event) {
      const tarjeta = boton.closest(".tarjeta-oferta");

      const nombre = tarjeta.querySelector("h3").textContent;

      const descuento = tarjeta.querySelector(".badge-descuento").textContent;

      mostrarMensaje(descuento);

      const respuesta = confirm(
        "¿Desea aprovechar la oferta de\n\n" + nombre + "?",
      );

      if (!respuesta) {
        event.preventDefault();
      } else {
        localStorage.setItem("productoOferta", nombre);
      }
    });
  });
}

function mostrarMensaje(descuento) {
  if (descuento.includes("%")) {
    alert("¡Excelente! Esta oferta tiene un descuento especial.");
  } else if (descuento == "2x1") {
    alert("¡Llévate dos productos pagando uno!");
  } else {
    alert("¡Quedan muy pocas unidades disponibles!");
  }
}
