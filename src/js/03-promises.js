import Notiflix from 'notiflix';

refs = {
  btnSubmit: document.querySelector('button'),
  input: document.querySelectorAll('input'),
};

refs.btnSubmit.addEventListenet('submit', createPromise);
// refs.input('input');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Fulfill(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
