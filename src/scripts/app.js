document.addEventListener('DOMContentLoaded', cargarProductos);

let productoEditandoId = null;
let categoriaEditando = null;

function cargarProductos() {
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tablaProductos');
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar los productos

            data.forEach((producto) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.categoria}</td>
                    <td><a href="${producto.imagen1}" target="_blank">Ver Imagen 1</a></td>
                    <td><a href="${producto.imagen2}" target="_blank">Ver Imagen 2</a></td>
                    <td><a href="${producto.imagen3}" target="_blank">Ver Imagen 3</a></td>
                    <td><a href="${producto.imagen4}" target="_blank">Ver Imagen 4</a></td>
                    <td>
                        <button class="btn btn-warning btn-edit" onclick="editarProducto(${producto.id}, '${producto.categoria}')">Editar</button>
                        <button class="btn btn-danger btn-delete" onclick="eliminarProducto(${producto.id}, '${producto.categoria}')">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function editarProducto(id, categoria) {
    console.log("Editando producto con ID:", id, "y categoría:", categoria);
    fetch(`http://localhost:3000/productos/${categoria}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            return response.json();
        })
        .then(producto => {
            console.log("Producto a editar:", producto);
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('precio').value = producto.precio;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('categoria').value = producto.categoria;
            document.getElementById('imagen1').value = producto.imagen1;
            document.getElementById('imagen2').value = producto.imagen2;
            document.getElementById('imagen3').value = producto.imagen3;
            document.getElementById('imagen4').value = producto.imagen4;

            // Guardar el ID y la categoría del producto que se está editando
            productoEditandoId = id;
            categoriaEditando = categoria;

            // Cambiar el título del modal a "Editar Producto"
            document.getElementById('modalProductoLabel').innerText = 'Editar Producto';

            // Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
            modal.show();
        })
        .catch(error => console.error('Error al obtener el producto para editar:', error));
}

document.getElementById('formProducto').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const categoria = document.getElementById('categoria').value;
    const imagen1 = document.getElementById('imagen1').value;
    const imagen2 = document.getElementById('imagen2').value;
    const imagen3 = document.getElementById('imagen3').value;
    const imagen4 = document.getElementById('imagen4').value;

    const producto = {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imagen1,
        imagen2,
        imagen3,
        imagen4
    };

    if (productoEditandoId) {
        // Editar producto existente
        fetch(`http://localhost:3000/productos/${categoriaEditando}/${productoEditandoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
            .then(response => response.json())
            .then(() => {
                cargarProductos(); // Recargar la tabla
                this.reset(); // Limpiar el formulario
                productoEditandoId = null; // Reiniciar el ID de edición
                categoriaEditando = null; // Reiniciar la categoría de edición
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
                modal.hide(); // Ocultar el modal
            })
            .catch(error => console.error('Error al actualizar producto:', error));
    } else {
        // Agregar nuevo producto
        fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
            .then(response => response.json())
            .then(() => {
                cargarProductos(); // Recargar la tabla
                this.reset(); // Limpiar el formulario
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
                modal.hide(); // Ocultar el modal
            })
            .catch(error => console.error('Error al agregar producto:', error));
    }
});

function eliminarProducto(id, categoria) {
    fetch(`http://localhost:3000/productos/${categoria}/${id}`, {
        method: 'DELETE'
    })
        .then(() => cargarProductos())
        .catch(error => console.error('Error al eliminar producto:', error));
}

// Limpiar el formulario y restablecer el ID de edición
function limpiarFormulario() {
    document.getElementById('formProducto').reset();
    productoEditandoId = null; // Reiniciar el ID de edición
    categoriaEditando = null; // Reiniciar la categoría de edición

    // Cambiar el título del modal a "Agregar Producto"
    document.getElementById('modalProductoLabel').innerText = 'Agregar Producto';
}