const formulario = document.getElementById("formPedido");
const cantidadInput = document.getElementById("cantidad");
const tiempoEntrega = document.getElementById("tiempoEntrega");

// Según la cantidad de pedidos aumentar o disminuir el tiempo de entrega
cantidadInput.addEventListener("input", actualizarTiempo);

actualizarTiempo();

function actualizarTiempo() {
  const cantidad = Number(cantidadInput.value);

  let minutos;

  if (cantidad === 1) {
    minutos = 20;
  } else if (cantidad <= 3) {
    minutos = 30;
  } else if (cantidad <= 5) {
    minutos = 40;
  } else {
    minutos = 50;
  }

  tiempoEntrega.textContent = minutos + " minutos";
}

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Usuario que inició sesión
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    alert("Debe iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  // Producto seleccionado
  const productoSeleccionado = document.querySelector(
    ".tarjeta-producto-animada:target",
  );

  if (!productoSeleccionado) {
    alert("No se encontró el producto.");
    return;
  }

  // Nombre
  const producto = productoSeleccionado.querySelector("h2").textContent;

  // Precio
  const textoPrecio =
    productoSeleccionado.querySelector(".precio-badge").textContent;

  const precio = parseFloat(
    textoPrecio.replace("S/.", "").replace("S/", "").trim(),
  );

  // Cantidad
  const cantidad = Number(cantidadInput.value);

  // Método de pago
  const metodo_pago = document.querySelector(
    'input[name="pago"]:checked',
  ).value;

  // Tiempo estimado (solo el número)
  const tiempo_entrega = parseInt(tiempoEntrega.textContent);

  const respuesta = await fetch("http://localhost:3000/pedido", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario_id: usuario.id,
      producto,
      precio,
      cantidad,
      metodo_pago,
      tiempo_entrega,
    }),
  });

  const data = await respuesta.json();

  if (data.ok) {
    alert(
      "Pedido registrado correctamente.\n\nTiempo estimado de entrega: " +
        tiempo_entrega +
        " minutos",
    );

    window.location.href = "pedidos.html";
  } else {
    alert(data.mensaje);
  }
});

// Cambio del tipo de comprobante
const comprobante = document.getElementById("sel-comprobante");

comprobante.addEventListener("change", () => {
  console.log("Comprobante:", comprobante.value);
});