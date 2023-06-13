import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputField = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataDaysEl = document.querySelector('[data-days]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');
btnEl.disabled = true;

const inputFlatpickrDate = flatpickr(inputField, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let userDate = selectedDates[0].getTime();
        const dateNow = new Date();
        if (userDate < dateNow.getTime()) {
            Notiflix.Notify.info("Please choose a date in the future");
        } else {
            btnEl.disabled = false;
        }
    }
});
let timerId;
function updateDate() {
    const userDates = inputFlatpickrDate.selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    const delTime = userDates - currentDate;
    const { days, hours, minutes, seconds } = convertMs(delTime);
    dataDaysEl.textContent = addLeadingZero(days);
    dataHoursEl.textContent = addLeadingZero(hours);
    dataMinutesEl.textContent = addLeadingZero(minutes);
    dataSecondsEl.textContent = addLeadingZero(seconds);
    if (delTime <= 0) {
        clearInterval(timerId);
        dataDaysEl.textContent = '00';
        dataHoursEl.textContent = '00';
        dataMinutesEl.textContent = '00';
        dataSecondsEl.textContent = '00';
        return;
    }
};
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};
btnEl.addEventListener('click', btnClick);
function btnClick() {
    updateDate();
    timerId = setInterval(() => updateDate(), 1000);
};


