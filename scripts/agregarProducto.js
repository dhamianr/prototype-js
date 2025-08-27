const agregarProducto = () => {
  const nombreInput = document.getElementById("nombreProducto");
  const precioInput = document.getElementById("precioKilo");

  const nombreProducto = nombreInput.value.trim();
  const preciokilo = parseFloat(precioInput.value);

  try {
    const nuevoProducto = ProductManager.agregarProducto(
      nombreProducto,
      preciokilo
    );

    // Limpiar inputs
    nombreInput.value = "";
    precioInput.value = "";

    alert(
      `✅ Producto "${nuevoProducto.nombreProducto}" agregado exitosamente`
    );
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const btnAgregar = document.getElementById("btn-agregar");

  if (btnAgregar) {
    btnAgregar.addEventListener("click", agregarProducto);
  }

  const nombreInput = document.getElementById("nombreProducto");
  const precioInput = document.getElementById("precioKilo");

  [nombreInput, precioInput].forEach((input) => {
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          agregarProducto();
        }
      });
    }
  });
});
