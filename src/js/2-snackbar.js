document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  if (isNaN(delay) || delay < 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Delay must be a positive number',
      position: 'topRight'
    });
    return;
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight'
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight'
      });
    });
    
  this.reset(); 
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}