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
];

const agregarProducto = (a, b, c) =>
  productos.push({ productoId: a, nombreProducto: b, preciokilo: c });

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
