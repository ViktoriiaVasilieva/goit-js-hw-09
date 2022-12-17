import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  // createPromises(Number(refs.delay.value), Number(refs.step.value));

  for (let i = 0; i < Number(refs.amount.value); i += 1) {
    let position = i + 1;
    let delay = Number(refs.delay.value) + Number(refs.step.value) * i;
    createPromise(position, delay)
      .then(result => {
        result;
      })
      .catch(result => {
        result;
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        );
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

// function onSucces({ position, delay }) {
//   Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// }

// function onError({ position, delay }) {
//   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// }
