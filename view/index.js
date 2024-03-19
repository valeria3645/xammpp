'use strict';

const ele = document.getElementById('trpro');
const table = document.querySelector('.table');
const elediv = document.querySelector('.newpro');
const datos = {};

const traer = () => {
  fetch('../cotrollador/traerproducto.php')
    .then(response => response.json())
    .then(data => {
      ele.innerHTML = '';

      data.forEach(dat => {
        let ar = Object.keys(dat);
        let newele = document.createElement('tr');
        let fragmento = document.createDocumentFragment();

        for (let i = 0; i < Object.keys(dat).length; i++) {
          let eletd = document.createElement('td');
          eletd.textContent = dat[ar[i]];
          if (i === 1 || i === 2) {
            eletd.contentEditable = 'true';
            eletd.addEventListener('input', (e) => {
              datos[ar[i]] = e.target.textContent;
              console.log(datos);
            });
          }
          fragmento.appendChild(eletd);
        }

        let tdboton = document.createElement('td');
        let divboton = document.createElement('div');
        let eliminar = document.createElement('button');
        let editar = document.createElement('button');
        tdboton.classList.add('tdboton');
        divboton.classList.add('divboton');
        eliminar.classList.add('eliminar');
        editar.classList.add('editar');
        eliminar.textContent = 'eliminar';
        eliminar.addEventListener('click', () => {
          fetch('../cotrollador/eliminarproducto.php', {
            method: 'POST',
            headers: {
              "content-type": "application/json"
            },
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify({ id: dat.id })
          }).then(respon => respon.text()).then(datar => traer());
        });
        editar.textContent = 'editar';

        divboton.appendChild(eliminar);
        divboton.appendChild(editar);
        tdboton.appendChild(divboton);
        fragmento.appendChild(tdboton);

        newele.appendChild(fragmento);
        ele.appendChild(newele);
      });
    });
}

traer();
