const renderizarProductos = () => {
  let container = document.getElementById("products");
  if (!container) return;

  const productos = ProductManager.getProductos();

  if (productos.length === 0) {
    container.innerHTML = `
        <div class="sistema-vacio">
          <h3>👋 ¡Sistema vacío!</h3>
          <p>No hay productos agregados.</p>
          <a href="./agregarProducto.html" class="button-link">Agregar primer producto</a>
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
        </div>
      `;
  });

  container.innerHTML = todosLosProductos;
};

const vaciarSistema = () => {
  if (confirm("¿Estás seguro de que quieres limpiar todos los productos?")) {
    ProductManager.vaciarSistema();
    renderizarProductos();
    alert("✅ Sistema limpiado correctamente");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();

  const btnVaciar = document.getElementById("btn-vaciar-sistema");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarSistema);
  }
});
