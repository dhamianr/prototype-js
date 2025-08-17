let productosDelSistema = JSON.parse(localStorage.getItem("productos")) || [];

const renderizarProductos = () => {
  let container = document.getElementById("products");

  // Solo ejecutar si el elemento existe
  if (!container) {
    return; // Salir si no encuentra el elemento
  }

  let todosLosProductos = "";

  productosDelSistema.forEach((producto) => {
    todosLosProductos += `
      <div class="product-card">
        <h3>${producto.nombreProducto}</h3>
        <h4>Precio: ${producto.preciokilo} ARS</h4>
        <button onclick="remover(${producto.productoId})">Eliminar Producto</button>
      </div>
        `;
  });

  console.log(todosLosProductos);

  container.innerHTML = todosLosProductos;
};

renderizarProductos();

const remover = (productoId) => {
  let productosFiltrados = productosDelSistema.filter(
    (productos) => productos.productoId !== productoId
  );

  productosDelSistema = productosFiltrados;
  localStorage.setItem("productos", JSON.stringify(productosDelSistema));
  renderizarProductos();
};
