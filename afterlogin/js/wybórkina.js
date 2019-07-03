/// global variables
const cinemaPoznan = make_cinemainfoObject(poznan);
const cinemaWarsaw = make_cinemainfoObject(warsaw);
const cinemaWroclaw = make_cinemainfoObject(wroclaw);
const array_ofCinema = [cinemaPoznan, cinemaWarsaw, cinemaWroclaw]
let imgCinema = document.querySelector('img.imgCircle');
const arrowLeft = document.querySelector('.fa-chevron-left');
const arrowRight = document.querySelector('.fa-chevron-right');
const backgroundChoose = document.querySelector('.infoText');
let index = 0;
show_imgtxtCinema();
imgHover();
//// end global variables

//// functions

function show_imgtxtCinema() {
    backgroundChoose.innerHTML = `<p class="info">
    ${array_ofCinema[index].info.name},<br>
    Lokalizacja: ${array_ofCinema[index].info.localisation},<br>
    Adres: ${array_ofCinema[index].info.adress}</p><img class="imgCircle" style="animation: opacity .3s ease-out" src="${array_ofCinema[index].info.imgsrc}" alt=""></img>`;
}

function make_cinemainfoObject(city) {
    let cinema = JSON.parse(city);
    cinema = cinema[0]
    return cinema
}

function imgHover() {
    imgCinema = document.querySelector('img.imgCircle');
    $(imgCinema).hover(function () {
        imgCinema.classList.toggle('opacityHover');
    });
}

const turnPhoto = () => {
    switch (true) {
        case index > 2:
            index = 0;
            break;
        case index < 0:
            index = 2;
            break;
    }
    show_imgtxtCinema();
    imgHover()
}

const imglistDown = () => {
    index--;
    turnPhoto();
}

const imglistUp = () => {
    index++;
    turnPhoto()
}
//// end of functions

arrowLeft.addEventListener('click', imglistDown);
arrowRight.addEventListener('click', imglistUp)