let carrito = [];
let carritoVisible = false;

function agregarAlCarrito(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    actualizarCarrito();
    actualizarCantidadCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    let total = 0;
    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        listaCarrito.appendChild(item);
        total += producto.precio;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    actualizarCantidadCarrito();
}

function finalizarCompra() {
    alert('Compra finalizada. Gracias por su compra.');
    carrito = [];
    actualizarCarrito();
    actualizarCantidadCarrito();
}

function actualizarCantidadCarrito() {
    const cantidad = carrito.length;
    document.getElementById('carrito-cantidad').textContent = cantidad;
}

function toggleCarrito() {
    carritoVisible = !carritoVisible;
    const carrito = document.getElementById('carrito');
    if (carritoVisible) {
        carrito.classList.remove('hidden');
    } else {
        carrito.classList.add('hidden');
    }
}

