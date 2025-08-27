const ProductManager = {
  //  Obtener productos desde mi local storage
  getProductos: () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
  },

  // Guardar productos
  setProductos: (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
  },

  // para generar mis ids, y evitar duplicidad
  generarIdUnico: () => {
    const productos = ProductManager.getProductos();
    if (productos.length === 0) return 1;

    // Encuentra el ID más alto y suma 1
    const maxId = Math.max(...productos.map((p) => p.productoId));
    return maxId + 1;
  },

  // Agregar producto
  agregarProducto: (nombreProducto, preciokilo) => {
    // Validaciones
    if (!nombreProducto || nombreProducto.trim() === "") {
      throw new Error("El nombre del producto es requerido");
    }

    if (isNaN(preciokilo) || preciokilo <= 0) {
      throw new Error("El precio debe ser un número mayor a 0");
    }

    // Verificar nombre duplicado
    const productos = ProductManager.getProductos();
    const nombreExiste = productos.some(
      (p) => p.nombreProducto.toLowerCase() === nombreProducto.toLowerCase()
    );

    if (nombreExiste) {
      throw new Error("Ya existe un producto con ese nombre");
    }

    // Crear nuevo producto
    const nuevoProducto = {
      productoId: ProductManager.generarIdUnico(),
      nombreProducto: nombreProducto.trim(),
      preciokilo: parseFloat(preciokilo),
    };

    // Agregar y guardar
    productos.push(nuevoProducto);
    ProductManager.setProductos(productos);

    return nuevoProducto;
  },

  //  Eliminar producto
  eliminarProducto: (productoId) => {
    const productos = ProductManager.getProductos();
    const productosFiltrados = productos.filter(
      (p) => p.productoId !== productoId
    );

    if (productos.length === productosFiltrados.length) {
      throw new Error("Producto no encontrado");
    }

    ProductManager.setProductos(productosFiltrados);
    return true;
  },

  //  Vaciar sistema
  vaciarSistema: () => {
    ProductManager.setProductos([]);
  },

  // Buscar producto por id
  buscarProductoPorId: (productoId) => {
    const productos = ProductManager.getProductos();
    return productos.find((p) => p.productoId === productoId);
  },
};
