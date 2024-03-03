// export { }

// if(!user){
//     window.location.href="../Login/index.html";
// }

const url = "http://localhost:3001/menu";

const userCheck = JSON.parse(localStorage.getItem("user"));
if(!userCheck){
    window.location.href='../../Login/index.html';
}

const cerrarBtn = document.querySelector('#cerrarBtn');
cerrarBtn.addEventListener("click",async e=>{
    localStorage.removeItem("user");
    window.location.href="../../Login/index.html"
})


export const nuevoProducto = async producto =>{
    try {
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type':'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const listaProductos = async ()=>{
    try {
        const resultado = await fetch(url);
        const productos = await resultado.json();
        return productos;
    } catch (error) {
        console.log(error)
    }
}
export const obtenerProducto = async id =>{
    try {
        const resultado = await fetch(`${url}/${id}`);
        const producto = await resultado.json();
        return producto;
    } catch (error) {
        console.log(error)
    }
}

export const editarProducto = async producto =>{
    try {
        await fetch(`${url}/${producto.id}`,{
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type':'application/json'
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const eliminarProducto = async id => {
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}