import { createNotification } from "../components/notifications.js";

const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const btnRegistro = document.querySelector('#form-btn');
// Verificar si Axios se instaló correctamente
// console.log(axios);
// import
const notification = document.querySelector('#notification1');


// Expresiones regulares REGEX (validación)
const emailVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
const nameVal = /^[a-zA-Z]+( [a-zA-Z]+)?$/;

let valemail = false;
let valpass = false;
let valmatch = false;
let valname = false;

// input o change
nameInput.addEventListener('input', e => {
    valname = nameVal.test(nameInput.value);
    validar(nameInput, valname);
})

emailInput.addEventListener('input', e => {
    valemail = emailVal.test(emailInput.value);
    console.log(valemail);
    validar(emailInput, valemail);
})

passwordInput.addEventListener('input', e => {
    valpass = passwordVal.test(passwordInput.value);
    validar(passwordInput, valpass);

    // validar password y match
    validar(matchInput, valmatch)
})

matchInput.addEventListener('input', e => {
    valmatch = e.target.value === passwordInput.value;
    validar(matchInput, valmatch)

    // validar password y match
    validar(passwordInput, valpass)
})


const validar = (input, val) => {
    // // si todos los campos son true, disabled se removerá
    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : true;

    if (val) {
        input.classList.remove('focus:outline-blue-600');
        input.classList.add('focus:outline-green-700');
    } else if (input.value === "") {
        input.classList.remove('focus:outline-red-700');
        input.classList.remove('focus:outline-green-700');
        input.classList.add('focus:outline-blue-600');
    } else {
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-green-700');
        input.classList.add('focus:outline-red-700');
    }
}

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            role: 'mesero'
        }

        console.log(newUser)

        formulario.reset();

        // REQUEST
        const response = await axios.post('http://localhost:3001/users', newUser);
        console.log(response)

        // createNotification(false, response.data.msg);
        // console.log(newUser)

    } catch (error) {
        console.log(error);


        createNotification(true, error.response.data.error);
        console.log(error.response.data.error)

        setTimeout(()=>{
            notification.classList.add('hidden');
        }, 2000);
    }
    


})

