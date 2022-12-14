import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let deadlineTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    deadlineTimer = selectedDates[0].getTime();

    if (deadlineTimer < Date.now()) {
      alert('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', false);
    } else {
      refs.startBtn.toggleAttribute('disabled');
    }
  },
};
const flatPcr = flatpickr(refs.input, options);

refs.startBtn.setAttribute('disabled', false);
refs.input.addEventListener('input', flatPcr);
refs.startBtn.addEventListener('click', () => timer.start());

const timer = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(() => {
      const deltaTime = deadlineTimer - Date.now();
      const timeComponents = convertMs(deltaTime);

      updClockInterface(timeComponents);
      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
