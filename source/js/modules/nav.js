export const initNav = () => {
  const navElement = document.querySelector('[data-nav]');
  if (!navElement) {
    return;
  }

  const linkElements = navElement.querySelectorAll('a');

  const setActive = (hash) => {
    linkElements.forEach((linkElement) => linkElement.classList.remove('is-active'));
    navElement.querySelector(`[href="${hash}"]`).classList.add('is-active');
  };

  navElement.addEventListener('click', (event) => {
    if (event.target.href) {
      setActive(event.target.getAttribute('href'));
    }
  });

  setActive('#'); // Start
};
