import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '48876582-9b859673e779d9e5d61f29cd8';
const BASE_URL = 'https://pixabay.com/api/';

export async function searchImages(searchImage, page = 1, perPage = 40) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  const url = BASE_URL + `?${params}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
}
