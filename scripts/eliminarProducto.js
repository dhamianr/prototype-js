const renderizarProductosParaEliminar = () => {
  let container = document.getElementById("products");
  if (!container) return;

  const productos = ProductManager.getProductos();

  if (productos.length === 0) {
    container.innerHTML = `
      <div class="sistema-vacio">
        <h3>No hay productos para eliminar</h3>
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
        <button class="btn-eliminar" data-producto-id="${producto.productoId}">
          Eliminar Producto
        </button>
      </div>
    `;
  });

  container.innerHTML = todosLosProductos;
};

const removerProducto = (productoId) => {
  try {
    const producto = ProductManager.buscarProductoPorId(productoId);

    if (confirm(`¿Eliminar "${producto.nombreProducto}"?`)) {
      ProductManager.eliminarProducto(productoId);
      renderizarProductosParaEliminar();
      alert(`✅ Producto "${producto.nombreProducto}" eliminado correctamente`);
    }
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosParaEliminar();

  const container = document.getElementById("products");
  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-eliminar")) {
        const productoId = parseInt(e.target.dataset.productoId);
        removerProducto(productoId);
      }
    });
  }
});
