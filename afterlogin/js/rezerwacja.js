const backfrom_iReservation = document.querySelector('i.fa-times');
const backfrom_iPanel = document.querySelector('.second');
const backfrom_ticketPanel = document.querySelector('.three');
const buttonBuy = document.querySelector('button.buy');
const reservationPanel = document.querySelector('div.reservationPanel');
const reservationDivs = [...document.querySelectorAll('div.reservation > div')];
const divstitle_Cinemacity = [...document.querySelectorAll('div.cinemaCity > div.title')];
const divstitle_Helios = [...document.querySelectorAll('div.helios > div.title')];
const divstitle_Ohkino = [...document.querySelectorAll('div.ohkino > div.title')];
const title_reservationDivs = [divstitle_Cinemacity, divstitle_Helios, divstitle_Ohkino];
const poznan_listofSeats = make_seatsList(poznan);
const warsaw_listofSeats = make_seatsList(warsaw);
const wroclaw_listofSeats = make_seatsList(wroclaw);
const inputNormal = document.querySelector('.normal');
const inputSpecial = document.querySelector('.special');
const divSummary = document.querySelector('div.summary');
const spanSummary = [...document.querySelectorAll('p.reservationInfo span')];
const divwith_hoursCinemaCity = [...document.querySelectorAll('.cinemaCity div.hour')];
const divwith_hoursHelios = [...document.querySelectorAll('.helios div.hour')];
const divwith_hoursOhkino = [...document.querySelectorAll('.ohkino div.hour')];
const divwithroomCinemaCity = [...document.querySelectorAll('.cinemaCity div.room')]
const divwithroomHelios = [...document.querySelectorAll('.helios div.room')]
const divwithroomOhkino = [...document.querySelectorAll('.ohkino div.room')]
const arrayofcinemaSeats = [poznan_listofSeats, warsaw_listofSeats, wroclaw_listofSeats];
const arrayofhourDivs = [divwith_hoursCinemaCity, divwith_hoursHelios, divwith_hoursOhkino];
const arrayofroomsDivs = [divwithroomCinemaCity, divwithroomHelios, divwithroomOhkino];
let price = 0;
let title;
let seatsNumber;
let room;
let hour;
let seatSelect;


function make_seatsList(city) {
    let seats = JSON.parse(city);
    seats = seats[2].seats
    return seats
}

const changePrice = () => {
    $(inputNormal).change(
        function () {
            price = 30
            spanSummary[5].textContent = `${price}zł`
        });

    $(inputSpecial).change(
        function () {
            price = 16;
            spanSummary[5].textContent = `${price}zł`
        });
}

const makesummaryPanel = () => {
    remove_hiddenClass(backfrom_iPanel);
    add_hiddenClass(backfrom_ticketPanel);
    reservationPanel.style.pointerEvents = "none";
    reservationPanel.style.filter = "blur(30px)";
    changePrice();
    divSummary.style.display = "flex";
    spanSummary[0].textContent = title;
    spanSummary[1].textContent = array_ofCinema[index].info.name
    spanSummary[2].textContent = room;
    spanSummary[3].textContent = seatSelect;
    spanSummary[4].textContent = hour;
    spanSummary[5].textContent = `Wybierz rodzaj biletu!`


}

const makeReservationPanel = () => {
    backfrom_iPanel.style.transition = "0"
    remove_hiddenClass(backfrom_iReservation);
    add_hiddenClass(backfrom_iPanel);
    reservationPanel.innerHTML = `<div class="
    screen">EKRAN</div>`;
    add_hiddenClass(reservationPanel);
    for (let i = 1; i <= seatsNumber; i++) {
        const div = document.createElement('div');
        div.className = "mySeat";
        if (i <= 10) {
            div.textContent = `${i}A`;
        } else if (i <= 20) {
            div.textContent = `${i}B`;
        } else if (i <= 30) {
            div.textContent = `${i}C`;
        } else if (i <= 40) {
            div.textContent = `${i}D`;
        } else if (i <= 50) {
            div.textContent = `${i}E`;
        } else if (i <= 60) {
            div.textContent = `${i}F`;
        }
        reservationPanel.appendChild(div);
    }
    const div_myseatAll = [...document.querySelectorAll('.mySeat')];

    const interval = setInterval(() => {
        div_myseatAll[[Math.floor(Math.random() * div_myseatAll.length)]].classList.add("block")
    }, 0);

    setTimeout(() => {
        clearInterval(interval)
    }, Math.floor(Math.random() * 100));

    div_myseatAll.forEach(div => {
        div.addEventListener('click', function () {
            seatSelect = div.textContent;
            makesummaryPanel();
        })
    });

    reservationDivs[index].style.display = "none";
}

const getchooseInfo = () => {
    arrayofhourDivs[index].forEach((div) => {
        div.addEventListener('click', function () {
            if ($(div).hasClass(`a[${index}]`)) {
                seatsNumber = arrayofcinemaSeats[index][0];
            } else if ($(div).hasClass(`b[${index}]`)) {
                seatsNumber = arrayofcinemaSeats[index][1];
            } else if ($(div).hasClass(`c[${index}]`)) {
                seatsNumber = arrayofcinemaSeats[index][2];
            } else if ($(div).hasClass(`d[${index}]`)) {
                seatsNumber = arrayofcinemaSeats[index][3];
            } else if ($(div).hasClass(`e[${index}]`)) {
                seatsNumber = arrayofcinemaSeats[index][4];
            };
            if ($(div).hasClass(`0Movie`)) {
                title = arrayof_moviesList[index][0].title;
            } else if ($(div).hasClass(`1Movie`)) {
                title = arrayof_moviesList[index][1].title;
            } else if ($(div).hasClass(`2Movie`)) {
                title = arrayof_moviesList[index][2].title;
            } else if ($(div).hasClass(`3Movie`)) {
                title = arrayof_moviesList[index][3].title;
            } else if ($(div).hasClass(`4Movie`)) {
                title = arrayof_moviesList[index][4].title;
            }
            room = div.className.split(" ")[1].split("[")[0].toUpperCase();
            hour = div.textContent;

            console.log(room);
            console.log(seatsNumber);
            console.log(title);
            console.log(hour);
            makeReservationPanel();
        })
    })
}

const gotoReservation = () => {
    section_cinemaChoose.style.display = "none";
    add_hiddenClass(backfrom_iReservation);
    divReservation.style.display = "flex";
    add_hiddenClass(divWrapper);
    reservationDivs[index].style.display = "flex";
    getchooseInfo();
    for (let i = 0; i <= title_reservationDivs[index].length - 1; i++) {
        title_reservationDivs[index][i].textContent = arrayof_moviesList[index][i].title;
    }
}

const backfrom_reservation = () => {
    divReservation.style.display = "none";
    section_cinemaChoose.style.display = "flex";
    reservationDivs[index].style.display = "none";
    remove_hiddenClass(backfrom_iReservation);
    remove_hiddenClass(reservationPanel)
}

const backfrom_reservationPanel = () => {
    backfrom_iPanel.style.transition = "0"
    add_hiddenClass(backfrom_iReservation);
    remove_hiddenClass(backfrom_iPanel);
    reservationPanel.innerHTML = `<div class="
    screen">EKRAN</div>`;
    remove_hiddenClass(reservationPanel);
    divReservation.style.display = "flex";
    reservationDivs[index].style.display = "flex";
}

const backfrom_ticket = () => {
    add_hiddenClass(backfrom_iPanel);
    remove_hiddenClass(backfrom_ticketPanel);
    reservationPanel.style = "";
    divSummary.style.display = "none";
}


backfrom_iPanel.addEventListener('click', backfrom_reservationPanel)
backfrom_iReservation.addEventListener('click', backfrom_reservation);
backfrom_ticketPanel.addEventListener('click', backfrom_ticket)
popupButton.addEventListener('click', gotoReservation);
buttonBuy.addEventListener('click', function () {
    window.open('/../../login/login.html', '_self')
})