document.addEventListener('DOMContentLoaded', function () {
    const ele = document.getElementById('trpro');
    const modalNuevo = new bootstrap.Modal(document.getElementById('modalNuevo'));
    const modalActualizar = new bootstrap.Modal(document.getElementById('modalActualizar'));
    const btnNuevo = document.getElementById('btnNuevo');
    const formActualizar = document.getElementById('formActualizar');

    // Función para cargar y mostrar los datos de productos en la tabla
    const cargarYMostrarProductos = () => {
        fetch('../controller/traerproductocontroller.php')
            .then(response => response.json())
            .then(data => {
                ele.innerHTML = ''; // Limpiar contenido previo de la tabla
                data.forEach(producto => {
                    let nuevaFila = document.createElement('tr');
                    nuevaFila.setAttribute('data-id', producto.id);

                    for (const key in producto) {
                        if (Object.hasOwnProperty.call(producto, key)) {
                            const value = producto[key];
                            let nuevaCelda = document.createElement('td');
                            nuevaCelda.textContent = value;
                            nuevaFila.appendChild(nuevaCelda);
                        }
                    }

                    let btnActualizar = document.createElement('button');
                    btnActualizar.textContent = 'Actualizar';
                    btnActualizar.classList.add('btn', 'btn-primary', 'btnActualizar');
                    btnActualizar.addEventListener('click', () => {
                        const id = nuevaFila.getAttribute('data-id');
                        const nombre = nuevaFila.querySelector('td:nth-child(2)').textContent;
                        const descripcion = nuevaFila.querySelector('td:nth-child(3)').textContent;

                        document.getElementById('updateId').value = id;
                        document.getElementById('updateNombre').value = nombre;
                        document.getElementById('updateDescripcion').value = descripcion;

                        modalActualizar.show();
                    });

                    let celdaActualizar = document.createElement('td');
                    celdaActualizar.appendChild(btnActualizar);
                    nuevaFila.appendChild(celdaActualizar);

                    ele.appendChild(nuevaFila);
                });
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    };

    cargarYMostrarProductos(); // Llamar a la función al cargar la página

    // Agregar evento clic al botón "Nuevo" para mostrar el modal de nuevo producto
    btnNuevo.addEventListener('click', () => {
        modalNuevo.show();
    });

    // Agregar evento submit al formulario de actualización
    formActualizar.addEventListener('submit', event => {
        event.preventDefault();

        const id = document.getElementById('updateId').value;
        const nombre = document.getElementById('updateNombre').value;
        const descripcion = document.getElementById('updateDescripcion').value;

        // Solicitud AJAX para actualizar el producto
        fetch('../controller/actualizarproductocontroller.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                descripcion: descripcion
            }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Imprimir mensaje de respuesta

            // Recargar y mostrar los productos actualizados en la tabla
            cargarYMostrarProductos();

            // Cerrar el modal de actualización
            modalActualizar.hide();
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
    });
});
