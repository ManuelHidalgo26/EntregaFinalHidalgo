document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let carritoVisible = false;

    const carritoIcono = document.getElementById('carrito-icono');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    const cantidadCarrito = document.getElementById('carrito-cantidad');
    const carritoSeccion = document.getElementById('carrito');
    const participarDescuentoBtn = document.getElementById('participar-descuento');

    carritoIcono.addEventListener('click', toggleCarrito);

    // Cargar productos desde un JSON local
    fetch('./productos.json')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        });

    function mostrarProductos(productos) {
        const productosSeccion = document.getElementById('productos');
        productos.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto');
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button data-producto="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
            `;
            productosSeccion.appendChild(productoElemento);
        });

        document.querySelectorAll('button[data-producto]').forEach(button => {
            button.addEventListener('click', (event) => {
                const producto = event.target.getAttribute('data-producto');
                const precio = parseFloat(event.target.getAttribute('data-precio'));
                agregarAlCarrito(producto, precio);
            });
        });
    }

    function agregarAlCarrito(nombre, precio) {
        const producto = { nombre, precio };
        carrito.push(producto);
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
        // Usar SweetAlert para notificaciones
        Swal.fire('Añadido', `"${nombre}" ha sido añadido al carrito.`, 'success');
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';

        let total = 0;
        carrito.forEach((producto, index) => {
            const item = document.createElement('li');
            item.textContent = `${producto.nombre} - $${producto.precio.toFixed(0)}`;
            item.innerHTML += ` <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            listaCarrito.appendChild(item);
            total += producto.precio;
        });

        totalElemento.textContent = '$' + total.toFixed(0);
    }

    window.eliminarDelCarrito = function(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
    }

    function finalizarCompra() {
        Swal.fire('Compra finalizada', 'Gracias por su compra.', 'success');
        carrito = [];
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
    }

    function actualizarCantidadCarrito() {
        const cantidad = carrito.length;
        cantidadCarrito.textContent = cantidad;
    }

    function toggleCarrito() {
        carritoVisible = !carritoVisible;
        if (carritoVisible) {
            carritoSeccion.classList.remove('hidden');
        } else {
            carritoSeccion.classList.add('hidden');
        }
    }

    function guardarCarritoEnStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    participarDescuentoBtn.addEventListener('click', participarDescuento);

    function participarDescuento() {
        const nombre = prompt('Por favor, introduce tu nombre:');
        if (nombre) {
            const intento = prompt('Hola ' + nombre + '! Participa por un descuento del 10% adivinando la palabra clave:').toLowerCase();
            if (intento === 'messi') {
                aplicarDescuento();
                Swal.fire('¡Felicidades!', 'Has ganado un descuento del 10% en tu próxima compra.', 'success');
            } else {
                Swal.fire('Lo siento', 'La palabra clave es incorrecta. ¡Sigue intentándolo!', 'error');
            }
        }
    }

    function aplicarDescuento() {
        const descuento = calcularDescuento();
        carrito.forEach((producto) => {
            producto.precio -= descuento / carrito.length;
        });
        actualizarCarrito();
        guardarCarritoEnStorage();
    }

    function calcularDescuento() {
        const total = carrito.reduce((accumulator, current) => accumulator + current.precio, 0);
        return total * 0.10;
    }

    actualizarCarrito();
    actualizarCantidadCarrito();

    // Botón para vaciar el carrito
    const vaciarCarritoBtn = document.createElement('button');
    vaciarCarritoBtn.textContent = 'Vaciar Carrito';
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    carritoSeccion.appendChild(vaciarCarritoBtn);

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
        Swal.fire('Carrito Vaciado', 'El carrito ha sido vaciado.', 'info');
    }
});
