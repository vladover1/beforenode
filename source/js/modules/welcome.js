const TIMEOUT = 5000;

export const initWelcome = () => {
  const welcomeElement = document.querySelector('.welcome');
  if (!welcomeElement) {
    return;
  }

  document.documentElement.style.overflow = 'hidden';

  setTimeout(() => {
    welcomeElement.classList.add('is-hidden');
    document.documentElement.style.overflow = 'auto';
  }, TIMEOUT);
};
