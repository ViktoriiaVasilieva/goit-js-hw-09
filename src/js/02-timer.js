import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let deadlineTimer = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    deadlineTimer = selectedDates[0].getTime();

    if (deadlineTimer < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};
flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartClick);
refs.startBtn.disabled = true;

function onStartClick() {
  intervalId = setInterval(() => {
    const deltaTime = deadlineTimer - Date.now();
    const timeComponents = convertMs(deltaTime);

    updClockInterface(timeComponents);
    if (deltaTime < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function updClockInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
