const BASE_URL = 'https://jsonplaceholder.typicode.com/photos/';
const ALL_URL = 'id=3&id=53&id=103';

export const initServices = () => {
  const servicesElement = document.querySelector('[data-services]');
  if (!servicesElement) {
    return;
  }

  const filtersElement = servicesElement.querySelector('[data-filters]');
  const filterElements = servicesElement.querySelectorAll('[data-filter]');
  const listElement = servicesElement.querySelector('[data-list]');

  const fillList = (filter) => {
    const url = `${BASE_URL}?${filter ? `albumId=${filter}&_limit=3` : ALL_URL}`;

    fetch(url).then((res) => res.json()).then((photos) => {
      listElement.innerHTML = photos.map(({ id, title, albumId }) => `
        <li data-id="${albumId}">
          <h3>Service ${id}</h3>
          <p>${title}</p>
        </li>
      `).join('');
    });

    filterElements.forEach((filterElement) => {
      filterElement.classList.remove('is-active');
    });
    filtersElement.querySelector(`[data-filter="${filter}"]`).classList.add('is-active');
  };

  fillList(''); // ALL by default

  filtersElement.addEventListener('click', (event) => {
    const { filter } = event.target.dataset;
    if (typeof filter === 'undefined') {
      return;
    }

    if (event.target.classList.contains('is-active')) {
      if (!filter) {
        return; // Don't need if ALL after ALL
      }

      fillList('');
    } else {
      fillList(filter);
    }
  });
};
