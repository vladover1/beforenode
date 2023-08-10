const TIMEOUT = 60000;

export const initCheckHere = () => {
  const messageElement = document.querySelector('[data-message-name="check-here"]');
  if (!messageElement) {
    return;
  }

  let hereTimeout;
  let responseTimeout;

  function checkHere () {
    messageElement.classList.remove('is-hidden');

    responseTimeout = setTimeout(() => {
      if (!messageElement.classList.contains('is-hidden')) {
        window.close();
        clear();
      }
    }, TIMEOUT);
  }

  function clear () {
    messageElement.classList.add('is-hidden');
    clearTimeout(hereTimeout);
    clearTimeout(responseTimeout);
    hereTimeout = setTimeout(checkHere, TIMEOUT);
  }

  messageElement.querySelector('button').addEventListener('click', () => {
    clear();
  });

  window.addEventListener('scroll', () => {
    clear();
  });

  hereTimeout = setTimeout(checkHere, TIMEOUT);
};
