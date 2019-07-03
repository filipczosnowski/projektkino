let pInfo;
let listofmovieDivs;
let index2;
let p_movieInfo;
let i;


const popupElement = document.querySelector('div.background');
const divWrapper = document.querySelector('div.wrapper');
const icon_quitpopUP = document.querySelector('div.background i');
const divBefore = document.querySelector('div.before');
const divmoviesList = document.querySelector('div.moviesList');
const popupH1 = document.querySelector('div.insidepopUp h1');
const popupButton = document.querySelector('div.insidepopUp button');
const popuph1Span = document.querySelector('div.insidepopUp h1 span');
const divReservation = document.querySelector('div.reservation');
const poznan_moviesList = make_moviesList(poznan);
const warsaw_moviesList = make_moviesList(warsaw);
const wroclaw_moviesList = make_moviesList(wroclaw);
const arrayof_moviesList = [poznan_moviesList, warsaw_moviesList, wroclaw_moviesList];





function make_moviesList(city) {
    let movies = JSON.parse(city);
    movies = movies[1].movies
    return movies
}

const add_hiddenClass = (element) => {
    return element.classList.add('hidden')
}

const add_popupClass = (element) => {
    return element.classList.add('popUp')
}

const remove_hiddenClass = (element) => {
    return element.classList.remove('hidden')
}

const remove_popupClass = (element) => {
    return element.classList.remove('popUp')
}


const action_onhiddenClass = (actionFunction = () => {}) => {
    actionFunction(divWrapper);
    actionFunction(backgroundChoose);
    actionFunction(imgExit);
    actionFunction(p_userName);
    actionFunction(icon_quitpopUP);
    actionFunction(pInfo);
    actionFunction(imgCinema);
    if (actionFunction === add_hiddenClass) {
        setTimeout(() => {
            actionFunction(popupH1)
        }, 350);
    } else actionFunction(popupH1)
}

const action_onpopupClass = (actionFunction = () => {}) => {
    actionFunction(popupElement);
    actionFunction(divBefore)
}

const show_popUp = () => {
    p_movieInfo = document.querySelector('p.movieInfo')
    pInfo = document.querySelector('p.info');
    action_onhiddenClass(add_hiddenClass)
    action_onpopupClass(add_popupClass);
    divBefore.style.backgroundImage = `url("${array_ofCinema[index].info.imgsrc}")`;
    popuph1Span.textContent = `${array_ofCinema[index].info.name} ${array_ofCinema[index].info.localisation}`;
    show_moviesList();
    whenyouChooseMovie();
    popupButton.style.display = "block";

}

const quit_popUp = () => {
    pInfo = document.querySelector('p.info');
    action_onhiddenClass(remove_hiddenClass)
    action_onpopupClass(remove_popupClass);
    divmoviesList.innerHTML = "";
    const new_pmovieInfo = document.createElement('p');
    new_pmovieInfo.className = "movieInfo";
    divmoviesList.appendChild(new_pmovieInfo);
    popupButton.style.display = "none";

}

const show_moviesList = () => {
    for (movie of arrayof_moviesList[index]) {
        const div = document.createElement('div');
        div.className = "movie";
        divmoviesList.appendChild(div);
        div.innerHTML = `<img class="poster" src="${movie.imgsrc}" alt="">`;
    }
}

const make_pmovieInfo = (element) => {
    return `<span style = "font-size:30px">${element.title}</span><br><span>
            Reżyseria: ${element.direction}<br>
            Scenariusz: ${element.scenario}<br>
            Gatunek: ${element.genre}</span><br><span>${element.info}</span><i class="fas fa-chevron-left"></i>`
}

const make_iBack = () => {
    const i = document.querySelector('p.movieInfo i');
    i.addEventListener('click', function () {
        if (listofmovieDivs.hasClass("clicked")) {
            listofmovieDivs.removeClass("clicked");
            listofmovieDivs.removeClass("none");
            p_movieInfo.style.display = "none";
            divmoviesList.style.flexDirection = "row";
            add_hiddenClass(popupH1);
            popupButton.style.display = "block";
        }
    })
}

const make_viewAfterclick = () => {
    listofmovieDivs.addClass('none');
    remove_hiddenClass(popupH1);
    p_movieInfo.style = "";
    p_movieInfo.innerHTML = make_pmovieInfo(arrayof_moviesList[index][index2]);
    p_movieInfo.style.display = "block";
    popupButton.style.display = "none";
    divmoviesList.style.flexDirection = "row-reverse";
    make_iBack();
}

const back_toMoviechoose = () => {
    listofmovieDivs.removeClass('none');
    add_hiddenClass(popupH1);
    p_movieInfo.style.display = "none";
    popupButton.style.display = "block";
    divmoviesList.style.flexDirection = "row"
}

const whenyouChooseMovie = () => {
    listofmovieDivs = $("div.moviesList > div");
    listofmovieDivs.click(function () {
        index2 = listofmovieDivs.index($(this));
        $(this).toggleClass('clicked');
        if ($(this).hasClass("clicked")) {
            make_viewAfterclick();
        } else {
            back_toMoviechoose();
        }
    })
}



setInterval(() => {
    imgCinema.addEventListener('click', show_popUp);
}, 0);

icon_quitpopUP.addEventListener('click', quit_popUp);