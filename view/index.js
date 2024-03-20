'use strict';

const ele = document.getElementById('trpro');
const modalNuevo = new bootstrap.Modal(document.getElementById('modalNuevo')); // Obtener el modal de nuevo producto
const btnNuevo = document.getElementById('btnNuevo');
const formNuevo = document.getElementById('formNuevo');

const traer = () => {
    fetch('../controller/traerproductocontroller.php')
        .then(response => response.json())
        .then(data => {
            ele.innerHTML = ''; 
            data.forEach(dat => {
                let newele = document.createElement('tr');
                newele.setAttribute('data-id', dat.id); 
              
                for (const key in dat) {
                    if (Object.hasOwnProperty.call(dat, key)) {
                        const element = dat[key];
                        let eletd = document.createElement('td');
                        eletd.textContent = element;
                        eletd.contentEditable = (key !== 'id'); 
                        newele.appendChild(eletd);
                    }
                }
                
                ele.appendChild(newele);
            });
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

traer();

// Agregar evento clic al botón "Nuevo" para mostrar el modal
btnNuevo.addEventListener('click', () => {
    modalNuevo.show();
});
