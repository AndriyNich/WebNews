import Notiflix from 'notiflix';

export function sendMessage(message) {
  Notiflix.Notify.warning(message);
}
