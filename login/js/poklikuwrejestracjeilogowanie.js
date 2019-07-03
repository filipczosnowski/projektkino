const btnReg = document.querySelector('.registerfirst button');
const btnLog = document.querySelector('div.loginfirst.registerfirst button');
const totalwrapper = document.querySelector('.totalwrapper')

const flipLogtoreg = () => {
    event.preventDefault();
    totalwrapper.classList.add('activeFlip');
}

const flipRegtolog = () => {
    event.preventDefault();
    totalwrapper.classList.remove('activeFlip');
}

const moveButton = () => {
    btnReg.classList.toggle('activeButton');
    btnLog.classList.toggle('activeButton')

}

btnLog.addEventListener('click', flipRegtolog);
btnLog.addEventListener('click', comeback_toReg(btnLog, 200))
btnReg.addEventListener('click', flipLogtoreg);
btnReg.addEventListener('click', comeback_toLog(btnReg, 200));
$(btnReg).on('mousedown mouseup', moveButton);
$(btnLog).on('mousedown mouseup', moveButton)