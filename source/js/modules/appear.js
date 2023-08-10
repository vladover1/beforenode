const initAppear = (element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });
  }, {
    root: null,
  });

  observer.observe(element);
};

export const initAppears = () => {
  document.querySelectorAll('[data-appear]').forEach(initAppear);
};
