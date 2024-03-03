const body = document.querySelector('body');

export const createNotification = (isError, message) => {
    const div = document.createElement('div');
    div.setAttribute("id", "notification1");
    div.classList.add('fixed', 'top-20', 'right-0', 'left-0', 'notif');
    if (isError) {
        div.innerHTML = `<div class="max-w-7xl mx-auto px-4 flex justify-end">
    <p class="bg-red-500 p-4 w-3/12 rounded-lg font-bold text-center">${message}</p>
    </div>
    `
    }else {
        div.innerHTML = `<div class="max-w-7xl mx-auto px-4 flex justify-end">
    <p class="bg-green-500 p-4 w-3/12 rounded-lg font-bold text-center">${message}</p>
    </div>
    `
    }

    body.appendChild(div);

    
}