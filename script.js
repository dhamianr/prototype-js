let productos = [
  {
    productoId: 1,
    nombreProducto: "Banana",
    preciokilo: 1000.0,
  },
  {
    productoId: 2,
    nombreProducto: "Manzana",
    preciokilo: 2000.0,
  },
  {
    productoId: 3,
    nombreProducto: "Papa",
    preciokilo: 1500.0,
  },
  {
    productoId: 4,
    nombreProducto: "Cebolla",
    preciokilo: 1000.0,
  },
  {
    productoId: 5,
    nombreProducto: "Lechuga",
    preciokilo: 1700.0,
  },
];

/*
const agregarProducto = (a, b, c) =>
  productos.push({ productoId: a, nombreProducto: b, preciokilo: c });
*/
const eliminarProductoPorId = (a) => {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].productoId == a) {
      productos.splice(i, 1);
      break;
    }
  }
};

const imprimirProductos = () => {
  for (let i = 0; i < productos.length; i++) {
    console.log(productos[i]);
  }
};

function sumarProductos(...items) {
  let total = 0;

  for (let item of items) {
    let productoEncontrado = null;

    for (let i = 0; i < productos.length; i++) {
      if (productos[i].productoId === item.productoId) {
        productoEncontrado = productos[i];
        break;
      }
    }

    if (productoEncontrado) {
      total += productoEncontrado.preciokilo * item.cantidad;
    } else {
      console.warn(`Producto con ID ${item.productoId} no encontrado`); // esto se puede mejorar si, en vez de buscar por ID busco por nombnreProducto  ${item.nombreProducto}
    }
  }

  return total;
}

//-----------------
let opciones;

const agregarProducto = () => {
  const nombreInput = document.getElementById("nombreProducto");
  const precioInput = document.getElementById("precioKilo");

  const nombreProducto = nombreInput.value.trim();
  const preciokilo = parseFloat(precioInput.value);

  // Validaciones básicas
  if (!nombreProducto) {
    alert("Por favor ingresa un nombre de producto");
    return;
  }

  if (isNaN(preciokilo) || preciokilo <= 0) {
    alert("Por favor ingresa un precio válido");
    return;
  }

  // Crear nuevo producto
  const nuevoProducto = {
    productoId: productos.length + 1, // O generar ID único
    nombreProducto: nombreProducto,
    preciokilo: preciokilo,
  };

  // Agregar al array
  productos.push(nuevoProducto);

  // Limpiar inputs
  nombreInput.value = "";
  precioInput.value = "";

  // Re-renderizar la lista
  /*renderizarProductos(); */

  console.log("Producto agregado:", nuevoProducto);

  console.table(productos);

  localStorage.setItem("productos", JSON.stringify(productos));
};

/*
do {
  let input = prompt(
    "Elige una opción amiguito:\n1. Agregar producto\n2. Ver productos agregados\n3. Sumar compra\n4. eliminar un producto \n9. Salir"
  );

  if (input === null || input.trim() === "" || isNaN(input)) {
    alert("Por favor ingresá un número válido.");
    continue;
  }

  opciones = Number(input);

  switch (opciones) {
    case 1:
      alert("Agreguemos un producto");
      let id = Number(prompt("Ingresa el id del producto"));
      let nombre = prompt("Ingresa el nombre del producto");
      let price = Number(prompt("Ingresa el precio del producto"));

      if (
        isNaN(id) ||
        id <= 0 ||
        nombre === null ||
        nombre.trim() === "" ||
        isNaN(price) ||
        price <= 0
      ) {
        alert("Los datos del producto no son válidos. Intentalo de nuevo.");
        break;
      }
      agregarProducto(id, nombre, price);
      imprimirProductos();
      break;
    case 2:
      alert("Ver productos agregados");
      imprimirProductos();
      break;
    case 3:
      alert("Te pediremos los productos a sumar");
      //aca deberiamos sumar productos
      let productosASumar = [];
      let seguir;

      do {
        let id = Number(prompt("Dame el ID del producto:"));
        let cantidad = Number(prompt("Dame la cantidad:"));

        if (isNaN(id) || isNaN(cantidad) || id === 0 || cantidad <= 0) {
          alert("Ingresaste valores inválidos, probá de nuevo.");
          continue;
        }

        productosASumar.push({ productoId: id, cantidad: cantidad });

        seguir = prompt("¿Querés agregar otro producto? (si/no)").toLowerCase();
      } while (seguir === "si");

      let total = sumarProductos(...productosASumar);
      alert("El total a pagar es: $" + total);
      break;
    case 4:
      let idProductoInput = prompt(
        "Que objeto quieres eliminar de los productos agendados? id del producto"
      );
      //si queremos eliminar un producto de mi coleccion de objetos
      if (
        idProductoInput === null ||
        idProductInput.trim() === "" ||
        isNaN(idProductoInput)
      ) {
        alert("Por favor ingresá un número válido.");
        break;
      }
      let idProducto = Number(idProductoInput);
      eliminarProductoPorId(idProducto);
      break;
    case 9:
      alert("¡Saliendo del sistema!");
      break;
    default:
      alert("Elegí una opción válida (1, 2, 3, 4 o 9).");
      break;
  }
} while (opciones !== 9);
*/

const renderizarProductos = () => {
  let container = document.getElementById("products");

  // Solo ejecutar si el elemento existe
  if (!container) {
    return; // Salir silenciosamente si no encuentra el elemento
  }

  // Verificar si hay productos
  if (productos.length === 0) {
    container.innerHTML =
      '<div class="sistema-vacio">No hay productos en el sistema</div>';
    return;
  }

  let todosLosProductos = "";

  productos.forEach((producto) => {
    todosLosProductos += `
    <div class="product-card">
      <h3>${producto.nombreProducto}</h3>
      <h4>Precio: ${producto.preciokilo} ARS</h4>
    </div>
      `;
  });

  //console.log(todosLosProductos);

  container.innerHTML = todosLosProductos;
};

renderizarProductos();
console.table(productos);

localStorage.setItem("productos", JSON.stringify(productos));

console.log(productos.length);

const salir = () => {
  if (confirm("¿Estás seguro que quieres salir?")) {
    window.location.href = "index.html";
  }
};

// Función para limpiar mi sistema
const vaciarSistema = () => {
  if (
    confirm(
      "¿Estás seguro de que quieres limpiar todos los productos del sistema?"
    )
  ) {
    productos = [];
    renderizarProductos();
    console.log(productos);
    // Guardo en mi local storage
    localStorage.setItem("productos", JSON.stringify(productos));
  }
};
