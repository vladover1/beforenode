export const initTimePlaces = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const year = now.getFullYear();

  document.querySelectorAll('[data-day]').forEach((element) => {
    element.textContent = date;
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = year;
  });
};
