const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let interval = null;
refs.startBtn.addEventListener('click', getRandomHexColor);
refs.stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  refs.startBtn.disabled = false;
});

function getRandomHexColor() {
  interval = setInterval(() => {
    return (document.getElementsByTagName(
      'body'
    )[0].style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`);
  }, 1000);
  refs.startBtn.disabled = true;
}
