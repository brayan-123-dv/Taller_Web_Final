const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  alert("Debe iniciar sesión.");
  window.location.href = "login.html";
}

async function cargarPedidos() {
  const respuesta = await fetch(
    `http://localhost:3000/pedidos/${usuario.id}`,
  );

  const data = await respuesta.json();

  if (data.ok) {
    mostrarPedidos(data.pedidos);
  }
}

cargarPedidos();

function mostrarPedidos(pedidos) {
  const cantidadOrdenes = document.getElementById("cantidadOrdenes");
  const listaPedidos = document.getElementById("listaPedidos");
  const detallePedido = document.getElementById("detallePedido");

  cantidadOrdenes.textContent = `${pedidos.length} Órdenes`;

  listaPedidos.innerHTML = "";
  detallePedido.innerHTML = "";

  pedidos.forEach((pedido) => {
    listaPedidos.innerHTML += `
      <a href="#orden-${pedido.id}" class="tarjeta-historial-bloque">

        <div class="info-rapida">

          <span class="id-orden">
            Orden #${pedido.id}
          </span>

          <h3>
            ${pedido.producto}
          </h3>

          <p class="resumen-precio">
            Total: S/. ${(pedido.precio * pedido.cantidad).toFixed(2)}
          </p>

          <span class="estado-tag listo">
            Pendiente de recojo
          </span>

        </div>

      </a>
    `;

    detallePedido.innerHTML += `
      <div class="tarjeta-boleta-flex" id="orden-${pedido.id}">

        <div class="bloque-izquierda-producto">

          <div class="detalles-producto-boleta">

            <h3>
              ${pedido.producto}
            </h3>

            <span class="badge-estado listo">
              Pendiente de recojo
            </span>

          </div>

        </div>

        <div class="bloque-derecha-valores">

          <p>
            <strong>Cantidad:</strong>
            ${pedido.cantidad}
          </p>

          <p>
            <strong>Precio unitario:</strong>
            S/. ${pedido.precio.toFixed(2)}
          </p>

          <p>
            <strong>Total:</strong>
            S/. ${(pedido.precio * pedido.cantidad).toFixed(2)}
          </p>

          <p>
            <strong>Método de pago:</strong>
            ${pedido.metodo_pago}
          </p>

          <p>
            <strong>Tiempo estimado:</strong>
            ${pedido.tiempo_entrega} minutos
          </p>

          <button
            class="btn-eliminar"
            onclick="eliminarPedido(${pedido.id})">
            Cancelar pedido
          </button>

        </div>

      </div>
    `;
  });
}

// Eliminar pedido
async function eliminarPedido(id) {

  const confirmar = confirm(
    "¿Está seguro de cancelar este pedido?"
  );

  if (!confirmar) {
    return;
  }

  const respuesta = await fetch(
    `http://localhost:3000/pedido/${id}`,
    {
      method: "DELETE",
    },
  );

  const data = await respuesta.json();

  if (data.ok) {

    alert("Pedido cancelado correctamente.");

    cargarPedidos();

  } else {

    alert(data.mensaje);

  }
}