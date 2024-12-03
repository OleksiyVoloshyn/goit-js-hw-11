import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from '../main';

const options = {
  method: 'GET',
};
const API_KEY = '47437632-13d8a5fe3440cf41b4c602234';
const API_URL = 'https://pixabay.com/api/?';

export async function getGalleryData(queryValue) {
  try {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: queryValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const response = await fetch(API_URL + searchParams, options).then();
    if (!response.ok) {
      showInfoMessage(MESSAGES.error, MESSAGES_BG_COLORS.orange);
      return;
    }
    return await response.json();
  } catch (err) {
    showInfoMessage(
      `${MESSAGES.exception} ERROR:  ${err}`,
      MESSAGES_BG_COLORS.orange
    );
  }
}