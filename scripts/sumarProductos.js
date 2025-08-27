let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderizarProductosParaSumar = () => {
  let container = document.getElementById("products");
  if (!container) return;

  const productos = ProductManager.getProductos();

  if (productos.length === 0) {
    container.innerHTML = `
      <div class="sistema-vacio">
        <h3>No hay productos disponibles</h3>
        <p>Primero agrega productos al sistema</p>
        <a href="./agregarProducto.html" class="button-link">Agregar productos</a>
      </div>
    `;
    return;
  }

  let todosLosProductos = "";
  productos.forEach((producto) => {
    todosLosProductos += `
      <div class="product-card">
        <h3>${producto.nombreProducto}</h3>
        <h4>Precio: $${producto.preciokilo} ARS</h4>
        <input type="number" id="cantidad-${producto.productoId}" 
               placeholder="Cantidad" step="0.01" min="0"/>
        <button class="btn-sumar" data-producto-id="${producto.productoId}">
          Sumar Producto
        </button>
      </div>
    `;
  });

  container.innerHTML = todosLosProductos;
};

const sumar = (productoId) => {
  const kiloInput = document.getElementById(`cantidad-${productoId}`);
  let cantidadTexto = kiloInput.value.trim().replace(",", ".");

  const cantidadKilo = Number(cantidadTexto);

  if (isNaN(cantidadKilo) || cantidadKilo <= 0) {
    alert("Por favor ingresa una cantidad válida");
    return;
  }

  const producto = ProductManager.buscarProductoPorId(productoId);
  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  const itemCarrito = {
    productoId: producto.productoId,
    nombreProducto: producto.nombreProducto,
    preciokilo: producto.preciokilo,
    cantidad: cantidadKilo,
    subtotal: cantidadKilo * producto.preciokilo,
  };

  const indiceExistente = carrito.findIndex(
    (item) => item.productoId === productoId
  );

  if (indiceExistente !== -1) {
    carrito[indiceExistente].cantidad += cantidadKilo;
    carrito[indiceExistente].subtotal =
      carrito[indiceExistente].cantidad * carrito[indiceExistente].preciokilo;
  } else {
    carrito.push(itemCarrito);
  }

  // Limpiar input
  kiloInput.value = "";

  // Guardar carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // renderizar carrito
  renderizarCarrito();
};

const renderizarCarrito = () => {
  const container = document.getElementById("carrito-items");
  const totalContainer = document.getElementById("total-carrito");

  if (carrito.length === 0) {
    container.innerHTML =
      '<div class="carrito-vacio">Tu carrito está vacío</div>';
    totalContainer.textContent = "$0.00";
    return;
  }

  let carritoHTML = "";
  carrito.forEach((item) => {
    carritoHTML += `
      <div class="carrito-item">
        <h4>${item.nombreProducto}</h4>
        <p>Precio: $${item.preciokilo} por kg</p>
        <p>Cantidad: ${item.cantidad} kg</p>
        <p class="subtotal">Subtotal: $${item.subtotal.toFixed(2)}</p>
      </div>
    `;
  });

  container.innerHTML = carritoHTML;

  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);
  totalContainer.textContent = `$${total.toFixed(2)}`;
};

const vaciarCarrito = () => {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    carrito = [];
    renderizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("✅ Carrito vaciado");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosParaSumar();
  renderizarCarrito();

  const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
  if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);
  }

  const container = document.getElementById("products");
  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-sumar")) {
        const productoId = parseInt(e.target.dataset.productoId);
        sumar(productoId);
      }
    });
  }
});
