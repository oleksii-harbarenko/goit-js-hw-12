import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const waitMessage = document.querySelector('.wait-message');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loadMoreMessage = document.querySelector('.load-more-message');

let searchImage = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  searchImage = input.value.trim();
  if (!searchImage) {
    iziToast.warning({
      title: 'Error',
      message: 'Input search string',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  waitMessage.innerHTML =
    'Loading images, please wait...<span class="loader"></span>';

  try {
    const response = await searchImages(searchImage, currentPage);
    if (!response) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again',
        position: 'topRight',
      });
      return;
    }

    totalHits = response.data.totalHits;

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(response.data.hits);
      if (response.data.hits.length < totalHits) {
        loadMoreBtn.style.display = 'inline-block';
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again',
      position: 'topRight',
    });
    console.log(error);
  } finally {
    waitMessage.textContent = '';
  }
  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loadMoreMessage.innerHTML =
    'Loading more images, please wait...<span class="loader"></span>';
  loadMoreBtn.disabled = true;

  try {
    const response = await searchImages(searchImage, currentPage);
    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no more images to load.',
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      renderImages(response.data.hits);
      if (currentPage * 40 >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again',
      position: 'topRight',
    });
    console.log(error);
  } finally {
    loadMoreMessage.textContent = '';
    loadMoreBtn.disabled = false;
  }
});
