import { listaProductos, eliminarProducto } from "./api.js";


// "Giant" function
(function(){
    const listado = document.querySelector('#listado-Productos');
    

    
    
    document.addEventListener('DOMContentLoaded', mostrarProductos);
    listado.addEventListener('click', confirmarEliminar);


    async function mostrarProductos(){
        const producto = await listaProductos();
        // console.log(producto)

        producto.forEach(product=>{
            const {nombre, precio, categoria, id}  = product;
            const row = document.createElement('tr');
            row.innerHTML += `
                <td class = "px-6 py-4 border-b border-gray-200">
                    <p class = "text-gray-700 text-lg font-bold">${nombre}</p>
                </td>
                <td class = "px-6 py-4 border-b border-gray-200">
                    <p class = "text-gray-700 text-lg font-bold">${precio}$</p>
                </td>
                <td class = "px-6 py-4 border-b border-gray-200">
                    <p class = "text-gray-700 text-lg font-bold">${categoria}</p>
                </td>
                <td class = "px-6 py-4 border-b border-gray-200">
                    <a href = "/AdminPanel/EditarProducto/index.html?id=${id}" class = "text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href = "#" data-producto="${id}" class = "text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `

            listado.appendChild(row);
        })
    }

    

    async function confirmarEliminar (e){
        if(e.target.classList.contains('eliminar')){
            const productoId = parseInt(e.target.dataset.producto);
            // console.log(productoId);

            // confirm() es un Alert que devuelve true/false
            const confirmar = confirm('¿Quieres eliminar este producto?')
            // console.log(confirmar);

            if(confirmar){
                await eliminarProducto(productoId)
            }
        }
    }
})()