const navegacion = document.querySelector('#navegacion');

const crearNavHome = () => {
    navegacion.innerHTML = `
    <p class="text-white text-2xl font-bold">Restaurant App</p>

<!-- Mostrar si es mayor a 768px -->
<div class="hidden md:block">
    <a href="/login" class="text-white bg-blue-950 text-2xl px-4 py-2 font-bold rounded-lg hover:bg-blue-700 transition ease-in-out delay-150">Login</a>
    <a href="/registro" class="text-black bg-white text-2xl px-4 py-2 font-bold rounded-lg hover:bg-blue-700 transition ease-in-out delay-150">Registro</a>
</div>

<!-- Esconder si es menor a 768px -->
<div class="md:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2 cursor-pointer" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
    </svg>

</div>

<!-- Móvil -->
    <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center  flex-col gap-4 hidden">
        <a href="/login/" class="text-white bg-blue-950 font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out delay-150">Login</a>
        <a href="/registro/" class="text-black bg-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out delay-150">Registro</a>
    </div>
`
}

const crearNavLogin = () => {
    navegacion.innerHTML = `
    <p class="text-white text-2xl font-bold">Restaurant App</p>

    <!-- Mostrar si es mayor a 768px -->
    <div class="hidden md:block">
    <a href="/registro" class="text-black bg-white text-2xl px-4 py-2 font-bold rounded-lg hover:bg-blue-700 transition ease-in-out delay-150">Registro</a>    
    
    </div>

<!-- Esconder si es menor a 768px -->
<div class="md:hidden">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2 cursor-pointer" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
    </svg>

</div>

<!-- Móvil -->
    <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center  flex-col gap-4 hidden">
        
        <a href="/registro/" class="text-black bg-white font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out delay-150">Registro</a>
    </div>
`
}

const crearNavRegistro = () => {
    navegacion.innerHTML = `
    <p class="text-white text-2xl font-bold">Restaurant App</p>

    <!-- Mostrar si es mayor a 768px -->
    <div class="hidden md:block">
        
    <a href="/login" class="text-white bg-blue-950 text-2xl px-4 py-2 font-bold rounded-lg hover:bg-blue-700 transition ease-in-out delay-150">Login</a>
    </div>

    <!-- Esconder si es menor a 768px -->
    <div class="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2 cursor-pointer" width="44" height="44"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
    </svg>

</div>

<!-- Móvil -->
    <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center  flex-col gap-4 hidden">
        <a href="/login/" class="text-white bg-blue-950 font-bold py-2 px-4 hover:bg-blue-700 rounded-lg transition ease-in-out delay-150">Login</a>
       
    </div>
`
}


// Agregar rutas para los componentes ( '/' es la ruta raíz )
if(window.location.pathname === '/'){
    // Crear barra de navegación para el 'home'
    crearNavHome();
} else if(window.location.pathname === '/login/') {
    // Crear barra de navegación para el 'login'
    crearNavLogin();
} else if(window.location.pathname === '/registro/') {
    // Crear barra de navegación para el 'login'
    crearNavRegistro();
}


// ADELANTAR HASTA = PFS. Crear barra de navegación página de registro y login
// LEER DOCUMENTACION DE RENDER - DEPLOY A NODE EXPRESS APP (Deploy website)
// PROBAR DEPLOY ANTES DE TERMINAR EL PROYECTO

// Despliegue del menú en móvil
const navBtn = navegacion.children[2].children[0];
// console.log(navBtn)

navBtn.addEventListener('click', e=>{
    // console.log('click')
    const menuMobile = navegacion.children[3];
    // console.log(menuMobile)

    if (!navBtn.classList.contains('active')){
        // Menú cerrado en Mobile, mostrar el despliegue:
        navBtn.classList.add('active');
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');
        navBtn.innerHTML = '<path class="icon icon-tabler icon-tabler-menu-2 cursor-pointer hover:bg-blue-300" stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
    } else {
        navBtn.classList.remove('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>';

      
        menuMobile.classList.remove('flex');
        menuMobile.classList.add('hidden');
    }
})