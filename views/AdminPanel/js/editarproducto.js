import {
    showAlert
} from "./showAlert.js";
import {
    obtenerProducto,
    editarProducto
} from "./api.js";

const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const categoriaInput = document.querySelector('#categoria');
const idInput = document.querySelector('#id');

document.addEventListener('DOMContentLoaded', async () => {
    // Verificar que el producto exista
    const parametroURL = new URLSearchParams(window.location.search);
    // console.log(window.location.search) muestra una sección de la URL actual
    // console.log(parametroURL) muestra dicha sección como un objeto
    const idProducto = parseInt(parametroURL.get('id'));
    // El ID viene como String. Debe ser convertido a entero
    // console.log(idProducto)

    // Verificar que el id nos traiga el producto correcto:
    const producto = await obtenerProducto(idProducto)
    // console.log(producto)


    mostrarProducto(producto);

    // Registrar la actualización del producto
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarProducto)





})

// Enviar el producto
function mostrarProducto(producto) {
    const {
        nombre,
        precio,
        categoria,
        id
    } = producto;

    nombreInput.value = nombre;
    precioInput.value = precio;
    categoriaInput.value = categoria;
    idInput.value = id;
}



// Actualizar el producto
async function validarProducto(e) {
    e.preventDefault();
    const producto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        // Convertir a número
        id: parseInt(idInput.value)
    }

    // Validar que los campos no estén vacíos
    if (validacion(producto)) {
        showAlert('Todos los campos son obligatorios.')
        return
        // console.log('Todos los campos son obligatorios.')
    } else {
        await editarProducto(producto);
        window.location.href = 'index.html'
        // console.log('Campos llenos.')
    }


    function validacion(obj) {
        // !Object para negar los campos vacíos (recibidos como value)
        return !Object.values(obj).every(i => i !== '');
    }
}




const userCheck = JSON.parse(localStorage.getItem("user"));
if(!userCheck){
    window.location.href='../../Login/index.html';
}

const cerrarBtn = document.querySelector('#cerrarBtn');
cerrarBtn.addEventListener("click",async e=>{
    localStorage.removeItem("user");
    window.location.href="../../Login/index.html"
})