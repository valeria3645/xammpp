'use strict';


const ele = document.getElementById('trpro');

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
