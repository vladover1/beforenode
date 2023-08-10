export const initProgress = () => {
  const progressElement = document.querySelector('[data-progress]');
  if (!progressElement) {
    return;
  }

  const onScroll = () => {
    const top = document.body.scrollTop || document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    progressElement.style.width = `${top / pageHeight * 100}%`;
  };

  window.addEventListener('scroll', onScroll);
};
