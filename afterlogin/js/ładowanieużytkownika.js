/// global variables

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://username-181e.restdb.io/rest/username",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "5d0acb7f52556062830a45df",
        "cache-control": "no-cache"
    }
}

const imgLoad = document.querySelector('img.load');
const imgExit = document.querySelector('img.exit');
const p_userName = document.querySelector('p.helloUser');
const span_userName = document.querySelector('.helloUser span');
const section_logOut = document.querySelector('section.logout');
const section_cinemaChoose = document.querySelector('section.cinemaChoose');
let userReservation;
let data2;
let idVar;
let p;
let settingsdel;
/// end of global variables

// functions

const deleteUser = (id = idVar) => {
    settingsdel = {
        "async": true,
        "crossDomain": true,
        "url": `https://username-181e.restdb.io/rest/username/${id}`,
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5d0acb7f52556062830a45df",
            "cache-control": "no-cache"
        }
    }
    deleteUser_ajax();
}

const deleteUser_ajax = () => {
    $.ajax(settingsdel).done(function (response) {
        return;
    });
}


const correctLogin = (data) => {
    idVar = data[Object.keys(data).length - 1]._id; /// id for delete
    span_userName.textContent = data[Object.keys(data).length - 1].user.email;
    deleteUser();
    p_userName.style.display = "block";
    section_logOut.style.display = "flex";
    section_cinemaChoose.style.display = "flex"
    imgExit.addEventListener("click", function () {
        window.open('/../../login/login.html', '_self')
    })
}

const makeErrorSpan = () => {
    imgLoad.classList.add('animation');
    const newSpan = document.createElement('span');
    newSpan.className = "spanInfo"
    newSpan.innerHTML = 'Utracono połączenie! <span>Spróbuj ponownie</span>';
    document.body.appendChild(newSpan);
    const span_backForm = document.querySelector('span.spanInfo span');
    span_backForm.addEventListener('click', function () {
        window.open('/../../login/login.html', '_self')
    })
}

const mainFunction = () => {
    $.ajax(settings).done(function (response) {
        const responseLenght = Object.keys(response).length;
        imgLoad.classList.add('animation');
        if (responseLenght > 0) {
            correctLogin(response)
        } else {
            makeErrorSpan();
        }
    });
}

mainFunction();