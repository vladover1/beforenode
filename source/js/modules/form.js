const TIMEOUT = 5000;
const messageElement = document.querySelector('[data-message-name]');
const messageTrigger = messageElement ? messageElement.dataset.messageName : '';

const syncValue = (fieldElement) => {
  if (fieldElement.checkValidity()) {
    localStorage.setItem(fieldElement.name, fieldElement.value);

    if (fieldElement.name === 'firstname' && fieldElement.value === messageTrigger) {
      messageElement.classList.remove('is-hidden');
      setTimeout(() => {
        messageElement.classList.add('is-hidden');
      }, TIMEOUT);
    }
  } else {
    localStorage.removeItem(fieldElement.name);
  }
};

const initForm = (formElement) => {
  const fieldElements = formElement.querySelectorAll('[name]');

  fieldElements.forEach((fieldElement) => {
    const savedValue = localStorage.getItem(fieldElement.name);
    if (savedValue) {
      fieldElement.value = savedValue;
    }

    fieldElement.addEventListener('change', () => {
      syncValue(fieldElement);
    });
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    fieldElements.forEach(syncValue);

    formElement.classList.add('is-validable');
  });
};

export const initForms = () => {
  document.querySelectorAll('[data-form]').forEach(initForm);
};
