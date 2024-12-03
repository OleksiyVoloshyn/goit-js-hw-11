import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './js/helpers';

import { getGalleryData } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const div = document.createElement('div');

form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();

  iziToast.destroy();
  gallery.innerHTML = '';
  addLoader();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());

  if (!search.trim()) {
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.blue);
    gallery.innerHTML = '';
    return;
  }

  try {
    const galleryData = await getGalleryData(search.trim());
    if (validateGalleryData(galleryData)) {
      renderGallery(galleryData, gallery);
    }
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  }

  event.target.reset();
}

function addLoader() {
  div.classList.add('loader');
  gallery.append(div);
}

function validateGalleryData(galleryData) {
  if (!galleryData) {
    gallery.innerHTML = '';
    return false;
  } else if (galleryData && galleryData.totalHits === 0) {
    showInfoMessage(MESSAGES.warning, MESSAGES_BG_COLORS.red);
    gallery.innerHTML = '';
    return false;
  } else {
    return true;
  }
}
//ERROR LOGIC
const MESSAGES = {
  info: 'Please enter a value in the search field!',
  warning:
    'Sorry, there are no images matching your search query. Please try again!',
  error:
    'Sorry, there are no connection to the server. Please try again later! ',
  exception:
    'Exception: We have some issue with connection. Please try again later! ',
};

const MESSAGES_BG_COLORS = {
  blue: '#abd4f8',
  orange: '#f28111',
  red: '#e97782',
};

function showInfoMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: `${color}`,
    message: `${message}`,
  });
}
export { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage };