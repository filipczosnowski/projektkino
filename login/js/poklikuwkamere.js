const cameraGif = document.querySelector('.gif');
const divLogin = document.querySelector('div.login');
const divregisterFirst = document.querySelector('div.registerfirst');


const showmeForm = () => {
    divLogin.style.transform = 'scale(1)';
    divregisterFirst.style.transform = 'scale(1)';
    cameraGif.style.transform = 'translate(-50%, -50%) scale(0)';
}

cameraGif.addEventListener('click', showmeForm)