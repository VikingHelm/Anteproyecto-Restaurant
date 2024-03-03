const btnGuardarCliente = document.querySelector("#guardar-cliente");


let cliente = {
    mesa: "",
    hora: "",
    pedido: []
}

const categorias = {
    1: "Pizzas",
    2: "Postres",
    3: "Jugos",
    4: "Comida",
    5: "Cafe"
}

btnGuardarCliente.addEventListener("click", guardarCliente)

function guardarCliente() {
    //console.log("click");
    const mesa = document.querySelector("#mesa").value;
    const hora = document.querySelector("#hora").value;

    const camposVacios = [mesa, hora].some(campo => campo == "")

    if (camposVacios) {
        //alguno de los campos estan vacios 
        //mostrar mensaje de error 
        console.log("vacios")
        const existeAlerta = document.querySelector("no-valido");
        if (!existeAlerta) {
            const alerta = document.createElement("div");
            alerta.classList.add("no-valido", "text-center");
            alerta.textContent = "Los campos son obligatorios";
            document.querySelector(".modal-body form").appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000)
        }
    } else {
        //console.log("llenos")
        cliente = {
            ...cliente,
            mesa,
            hora
        };
        // console.log(cliente)
        //ocultar ventana modal 
        var modalFormulario = document.querySelector("#formulario");
        var modal = bootstrap.Modal.getInstance(modalFormulario);
        modal.hide();

        mostrarSeccion();
        obtenerMenu();


    }

}

function obtenerMenu() {
    const url = 'http://localhost:3001/menu';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostraMenu(resultado))
        .catch(error => console.log(error, "error"))
}

function mostraMenu(menu) {
    // console.log(menu, "menu");

    const contenido = document.querySelector("#menu .contenido");

    menu.forEach(menu => {
        const fila = document.createElement("div");
        fila.classList.add("row", "border-top");

        const nombre = document.createElement("div");
        nombre.textContent = menu.nombre;
        nombre.classList.add("py-3", "col-md-4")

        const precio = document.createElement("div");
        precio.textContent = `$${menu.precio}`;
        precio.classList.add("py-3", "col-md-4");

        const categoria = document.createElement("div");
        categoria.textContent = categorias[menu.categoria];
        categoria.classList.add("py-3", "col-md-2");

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${menu.id}`;
        inputCantidad.classList.add('form-control');
        inputCantidad.onchange = function () {
            const cantidad = parseInt(inputCantidad.value);
            //console.log({...menu, cantidad})
            //console.log(cantidad)
            //console.log(menu)
            agregarOrden({
                ...menu,
                cantidad
            })
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2', 'py-3', 'inputCant');
        agregar.appendChild(inputCantidad)

        fila.appendChild(nombre);

        fila.appendChild(precio);

        fila.appendChild(categoria);

        fila.appendChild(agregar);

        contenido.appendChild(fila);
    })
}

function agregarOrden(producto) {
    //console.log(producto)
    let {
        pedido
    } = cliente;

    if (producto.cantidad > 0) {
        // Validad que el producto exista
        if (pedido.some(i => i.id === producto.id)) {
            const pedidoActualizado = pedido.map(i => {
                if (i.id === producto.id) {
                    i.cantidad = producto.cantidad;
                }
                return i;
            })
            cliente.pedido = [...pedidoActualizado];

        } else {
            // Caso de que no exista el producto
            // Lo agregamos
            cliente.pedido = [...pedido, producto];
        }
    } else {
        // Caso en que cantidad sea igual a 0
        // Lo eliminamos
        const resultado = pedido.filter(i=>i.id!==producto.id);
        cliente.pedido = resultado;
    }

    limpiarHTML();
    if(cliente.pedido.length){
        actualizarResumen();
    }else{
        mensajePedidoVacio();
    }

    
}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');
    const resumen = document.createElement('div');
    resumen.classList.add('col-md-6', 'card', 'py-5', 'shadow', 'px-3');

    // Mostrar la mesa
    const mesa = document.createElement('p');
    mesa.textContent = 'Mesa: ',
    mesa.classList.add('fw-bold');

    const mesaCliente = document.createElement('span');
    mesaCliente.textContent = cliente.mesa;
    mesa.appendChild(mesaCliente);

    // Mostrar la hora
    const hora = document.createElement('p');
    hora.textContent = 'Hora: ',
    hora.classList.add('fw-bold');

    const horaCliente = document.createElement('span');
    horaCliente.textContent = cliente.hora;
    hora.appendChild(horaCliente);

    // Mostrar los items del menú seleccionado
    const heading = document.createElement('h3');
    heading.textContent = 'Pedidos';
    heading.classList.add('my-4');

    const grupo = document.createElement('ul');
    grupo.classList.add('list-group');

    // Productos del arreglo 'pedido'
    const {pedido} = cliente;
    pedido.forEach(item=>{
        const {nombre, cantidad, precio, categoria, id} = item;
        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        const nombreP = document.createElement('p')
        nombreP.classList.add('text-center', 'my-4');
        nombreP.textContent = nombre;

        const cantidadP = document.createElement('p');
        cantidadP.classList.add('fw-bold');
        cantidadP.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('span');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        const precioP = document.createElement('p');
        precioP.classList.add('fw-bold');
        precioP.textContent = 'Precio:';

        const precioValor = document.createElement('span');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`;
        console.log(precio)

        const subtotalP = document.createElement('p');
        subtotalP.classList.add('fw-bold');
        subtotalP.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('span');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = calcularSubtotal(item);

        // Botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.textContent = 'Eliminar pedido';

        // Función para eliminar el contenido
        btnEliminar.onclick = function(){
            eliminarProducto(id);
        }

        // Agregar label a sus contenedores
        cantidadP.appendChild(cantidadValor);
        precioP.appendChild(precioValor);
        subtotalP.appendChild(subtotalValor);
        lista.appendChild(nombreP);
        lista.appendChild(cantidadP);
        lista.appendChild(precioP);
        lista.appendChild(subtotalP);
        lista.appendChild(btnEliminar);
        grupo.appendChild(lista);
    })

    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);
    
    // Agregamos el contenido
    contenido.appendChild(resumen);

    // Mostrar la calculadora de propinas
    formularioPropinas();

}


    


function mostrarSeccion() {
    const secciones = document.querySelectorAll(".d-none");
    console.log(secciones, "secciones")
    secciones.forEach(seccion => {
        seccion.classList.remove("d-none")
    })
}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');
    const texto = document.createElement('p');
    texto.classList.add('text-center');
    texto.textContent = 'Agrega productos al pedido';

    contenido.appendChild(texto);
}


function formularioPropinas(){
    const contenido = document.querySelector('#resumen .contenido');
    const formulario = document.createElement('div');
    formulario.classList.add('col-md-6', 'formulario');

    const heading = document.createElement('h3');
    heading.classList.add('my-4');
    heading.textContent = 'Propina';

    // Propina 5%
    const checkBox5 = document.createElement('input');
    checkBox5.type = 'radio';
    checkBox5.name = 'propina';
    checkBox5.value = '5';
    checkBox5.classList.add('form-check-input');
    // Llamar función calcularPropina sin paréntesis
    checkBox5.onclick = calcularPropina;

    checkLabel5 = document.createElement('label');
    checkLabel5.textContent = '5%';
    checkLabel5.classList.add('form-check-label');

    const checkDiv5 = document.createElement('div');
    checkDiv5.classList.add('form-check');
    checkDiv5.appendChild(checkBox5);
    checkDiv5.appendChild(checkLabel5);


    // Propina 10%
    const checkBox10 = document.createElement('input');
    checkBox10.type = 'radio';
    checkBox10.name = 'propina';
    checkBox10.value = '10';
    checkBox10.classList.add('form-check-input');
    // Llamar función calcularPropina sin paréntesis
    checkBox10.onclick = calcularPropina;

    checkLabel10 = document.createElement('label');
    checkLabel10.textContent = '10%';
    checkLabel10.classList.add('form-check-label');

    const checkDiv10 = document.createElement('div');
    checkDiv10.classList.add('form-check');
    checkDiv10.appendChild(checkBox10);
    checkDiv10.appendChild(checkLabel10);


    formulario.appendChild(checkDiv5);
    formulario.appendChild(checkDiv10);
    contenido.appendChild(formulario);
}



function calcularPropina(){
    const radioSeleccionado = document.querySelector('[name = "propina"]:checked').value;
    // console.log(radioSeleccionado)

    const {pedido} = cliente;

    let subtotal = 0;
    pedido.forEach(i=>{
        subtotal += i.cantidad * i.precio;
    })

    const divTotales = document.createElement('div');
    divTotales.classList.add('total-pagar');

    // Propina
    const propina = ((subtotal*parseInt(radioSeleccionado))/100);
    const total = propina + subtotal;

    // Subtotal
    const subtotalParrafo = document.createElement('p');
    subtotalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    subtotalParrafo.textContent = 'Subtotal consumo: '

    const subtotalP = document.createElement('span');
    subtotalP.classList.add('fs-normal');
    subtotalP.textContent = `$${subtotal}`;
    subtotalParrafo.appendChild(subtotalP);

    const propinaParrafo = document.createElement('span');
    propinaParrafo.classList.add('fs-3', 'fw-bold');
    propinaParrafo.textContent = 'Propina: '

    const propinaP = document.createElement('span');
    propinaP.classList.add('fs-normal');
    propinaP.textContent = `$${propina}`;
    propinaParrafo.appendChild(propinaP);

    // Total
    const totalParrafo = document.createElement('span');
    totalParrafo.classList.add('fs-3', 'fw-bold');
    totalParrafo.innerHTML = `<br><br>Total a pagar: `;

    const totalP = document.createElement('p');
    totalP.classList.add('fs-normal');
    totalP.textContent = `$${total}`;
    totalParrafo.appendChild(totalP);

    // Si se encuentra
    const totalPagarDiv = document.querySelector('.total-pagar');
    if(totalPagarDiv){
        totalPagarDiv.remove();
    }

    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);

    const formulario = document.querySelector('.formulario');
    formulario.appendChild(divTotales);


}

function calcularSubtotal(item){
    const {cantidad, precio} = item;
    return `$${cantidad * precio}`;
}

function eliminarProducto(id){
    const {pedido} = cliente;
    cliente.pedido = pedido.filter(i=>i.id!==id)

    limpiarHTML();

    if(cliente.pedido.length){
        actualizarResumen();
    }else{
        mensajePedidoVacio();
    }

    // Ahora como eliminamos el producto, debemos actualizar la cantidad a 0 en el input
    // console.log(id)

    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    inputEliminado.value = 0;
}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');
    const texto = document.createElement('p');
    texto.classList.add('text-center');
    texto.textContent = 'Agrega productos al pedido'

    contenido.appendChild(texto);
}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido');
    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}


// PEGAR INTERFAZ MÓDULO 4 PARA MESONERO - ADMIN