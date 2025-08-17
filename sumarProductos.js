let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

console.log(productos);

const renderizarProductos = () => {
  let container = document.getElementById("products");

  if (!container) {
    return; // Salir si no encuentra el elemento
  }

  let todosLosProductos = "";
  productos.forEach((producto) => {
    todosLosProductos += `
        <div class="product-card">
          <h3>${producto.nombreProducto}</h3>
          <h4>Precio: ${producto.preciokilo} ARS</h4>
          <input
            type="number"
            id="cantidad-${producto.productoId}"
            placeholder="Cantidad del producto"
            step="0.01"
            min="0"
          />
          <button onclick="sumar(${producto.productoId})">Sumar Producto</button>
        </div>
          `;
  });

  container.innerHTML = todosLosProductos;
};

const sumar = (productoId) => {
  // Busco el input especifico del producto
  const kiloInput = document.getElementById(`cantidad-${productoId}`);
  const cantidadKilo = parseFloat(kiloInput.value);

  // Validaciones básicas
  if (isNaN(cantidadKilo) || cantidadKilo <= 0) {
    alert("Por favor ingresa una cantidad válida");
    return;
  }

  // Busco el producto para obtener los datos del mismo
  const producto = productos.find((p) => p.productoId === productoId);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  // Creo objeto para el carrito
  const itemCarrito = {
    productoId: producto.productoId,
    nombreProducto: producto.nombreProducto,
    preciokilo: producto.preciokilo,
    cantidad: cantidadKilo,
    subtotal: cantidadKilo * producto.preciokilo,
  };

  // Verificar si el producto ya existe en el carrito
  const indiceExistente = carrito.findIndex(
    (item) => item.productoId === productoId
  );

  if (indiceExistente !== -1) {
    // Si existe, actualizar cantidad y subtotal
    carrito[indiceExistente].cantidad += cantidadKilo;
    carrito[indiceExistente].subtotal =
      carrito[indiceExistente].cantidad * carrito[indiceExistente].preciokilo;
  } else {
    // Si no existe, agregar nuevo item
    carrito.push(itemCarrito);
  }

  // Limpiar input
  kiloInput.value = "";

  // Guardo en mi local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log("Producto agregado al carrito:", itemCarrito);
  console.table(carrito);

  // muestro el total del carrito
  const totalCarrito = calcularTotalCarrito();
  console.log(`Total del carrito: $${totalCarrito}`);
};

const calcularTotalCarrito = () => {
  return carrito.reduce((total, item) => total + item.subtotal, 0);
};

// Función para mostrar el carrito (para cuando hagas el render del carrito)
const mostrarCarrito = () => {
  console.table(carrito);
  console.log(`Total: $${calcularTotalCarrito()}`);
};

// Función para renderizar carrito
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

// Función para vaciar carrito
const vaciarCarrito = () => {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    carrito = [];
    renderizarCarrito();
    console.log(carrito);
    // Guardo en mi local storage el carrito vacio
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};

// Inicializar la página

renderizarProductos();
renderizarCarrito();
