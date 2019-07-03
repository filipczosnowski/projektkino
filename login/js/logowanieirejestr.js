/// global scope
let userName;
const divRegister = document.querySelector('div.register');
const formLogin = document.querySelector('form.log');
const emailLogin = document.getElementById('email');
const passwordLogin = document.getElementById('password');
const formRegister = document.querySelector('div.register.login > form.register');
const emailRegister = document.getElementById('emailregister');
const passwordRegister = document.getElementById('passwordregister');
const userDatabase = {
    "async": true,
    "crossDomain": true,
    "url": "https://login-857b.restdb.io/rest/login",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "5d01171927bc5b75bfeb7b45",
        "cache-control": "no-cache"
    }
}
let data;
let data2;
let flag = true;
////  end global scope

const save_userName = () => {
    let json_list = {};
    let user = "user";
    json_list[user] = {};
    json_list[user].email = emailLogin.value;

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://username-181e.restdb.io/rest/username",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5d0acb7f52556062830a45df",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(json_list)
    }

    $.ajax(settings).done(function () {
        return windowOpen('/../../afterlogin/index.html')
    });



}

/// common functions

const windowOpen = (link) => window.open(link, "_self");

const formResult = (val = "", form, div) => {
    const text_afterReg = document.createElement('p');
    text_afterReg.className = "text_afterReg"
    text_afterReg.innerHTML += val;
    form.style.display = "none";
    div.appendChild(text_afterReg);
}


/// end of common functions

/// login - functions

const comeback_toLog = (val = document.querySelector('.text_afterReg span:nth-of-type(1)'), n = 0) => {
    val.addEventListener('click', function () {
        const comeback_text = document.querySelector('.text_afterReg');
        event.preventDefault();
        setTimeout(() => {
            formLogin.style.display = "";
            if (comeback_text)
                divLogin.removeChild(comeback_text);
            emailLogin.value = "";
            passwordLogin.value = "";
        }, n);
    })
};
const findUserLogin = () => {
    $.ajax(userDatabase).done(function (response) {
        const data = response;
        const list = data[0];
        let allUsers = [];
        for (let key in list) {
            allUsers.push(list[key]);
        };
        if (allUsers.find(obj => obj.email === emailLogin.value && obj.password === passwordLogin.value)) {
            save_userName();
        } else {
            formResult(`Podane dane są nieprawidłowe. <span style="cursor:pointer">Spróbuj ponownie!</span>`, formLogin, divLogin);
            comeback_toLog();
        }
    })
}

const logOn = (event) => {
    event.preventDefault();
    findUserLogin();
}


//// end login - functions


/// registration - functions
const makeJson = () => {
    let json_list = {};
    const emailValue = emailRegister.value;
    const passwordValue = passwordRegister.value;
    let user = `${emailValue.split('@')[0]}`;
    json_list[user] = {};
    json_list[user].email = emailValue;
    json_list[user].password = passwordValue;
    data = JSON.stringify(json_list);
}

const sendRegisterDate = (data) => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("PUT", "https://login-857b.restdb.io/rest/login/5d029e40ef140f0600006e1f");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5d01171927bc5b75bfeb7b45");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}

const comeback_toReg = (val = document.querySelector('.text_afterReg span:nth-of-type(2)'), n = 0) => {
    val.addEventListener('click', function () {
        const comeback_text = document.querySelector('.text_afterReg');
        event.preventDefault();
        setTimeout(() => {
            formRegister.style.display = "";
            if (comeback_text)
                divRegister.removeChild(comeback_text);
            emailRegister.value = "";
            passwordRegister.value = "";
        }, n);
    })
};

const regResult_theuserExist = () => {
    formResult(`Błąd! Użytkownik o e-mailu <span>${emailRegister.value}</span> został już wcześniej zarejestrowany.<br>Kliknij zaloguj lub<span>spróbuj ponownie wykorzystując inny adres e-mail.</span>`, formRegister, divRegister);
    comeback_toReg();
}

const regOn = () => {
    event.preventDefault();
    makeJson();
    sendRegisterDate(data);
    formResult(`Dziękujemy!<br>
    Użytkownik o e-mailu <span>${emailRegister.value}</span> został dodany. Możesz się zalogować lub <span>zarejestrować kolejnego użytkownika</span>`, formRegister, divRegister);
    comeback_toReg();
}

const register = () => {
    event.preventDefault();
    $.ajax(userDatabase).done(function (response) {
        const data = response;
        const list = data[0];
        let allUsers = [];
        for (let key in list) {
            allUsers.push(list[key]);
        };
        if (allUsers.find(obj => obj.email === emailRegister.value)) {
            regResult_theuserExist()
        } else regOn();
    })
}

//// end registration - functions


formLogin.addEventListener('submit', logOn);
formRegister.addEventListener('submit', register);