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

    document.querySelectorAll('button[data-producto]').forEach(button => {
        button.addEventListener('click', (event) => {
            const producto = event.target.getAttribute('data-producto');
            const precio = parseFloat(event.target.getAttribute('data-precio'));
            agregarAlCarrito(producto, precio);
        });
    });

    function agregarAlCarrito(nombre, precio) {
        const producto = { nombre, precio };
        carrito.push(producto);
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = '';

        let total = 0;
        carrito.forEach((producto, index) => {
            const item = document.createElement('li');
            item.textContent = `${producto.nombre} - $${producto.precio.toFixed(0)}`; // Redondear a 0 decimales
            listaCarrito.appendChild(item);
            total += producto.precio;
        });

        totalElemento.textContent = '$' + total.toFixed(0); // Redondear a 0 decimales y agregar el símbolo "$" solo una vez
    }

    window.eliminarDelCarrito = function(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
        actualizarCantidadCarrito();
        guardarCarritoEnStorage();
    }

    function finalizarCompra() {
        alert('Compra finalizada. Gracias por su compra.');
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
                alert('¡Felicidades ' + nombre + '! Has ganado un descuento del 10% en tu próxima compra.');
            } else {
                alert('Lo siento ' + nombre + ', la palabra clave es incorrecta. ¡Sigue intentándolo!');
            }
        }
    }

    function aplicarDescuento() {
        const descuento = calcularDescuento();
        carrito.forEach((producto) => {
            producto.precio -= descuento;
        });
        actualizarCarrito();
        guardarCarritoEnStorage();
    }

    function calcularDescuento() {
        const total = carrito.reduce((accumulator, current) => accumulator + current.precio, 0);
        return total * 0.10; // 10% de descuento
    }

    actualizarCarrito();
    actualizarCantidadCarrito();
});

