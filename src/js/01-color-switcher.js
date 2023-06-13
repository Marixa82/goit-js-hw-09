function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const startBtn = document.querySelector('[data-start]');
console.log(startBtn);
const stopBtn = document.querySelector('[data-stop]');
console.log(stopBtn);
const bodyEl = document.querySelector('body');
console.log(bodyEl);

startBtn.addEventListener('click', bodyChangeColor);
stopBtn.addEventListener('click', bodyStopChangeColor);

let intervalId = null;

function bodyChangeColor() {
    intervalId = setInterval(getBgColor, 1000);
    startBtn.toggleAttribute('disabled');
}
function getBgColor() {
    bodyEl.style.backgroundColor = getRandomHexColor();
}
function bodyStopChangeColor() {
    clearInterval(intervalId);
    startBtn.removeAttribute('disabled');
}