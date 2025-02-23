import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="gallery-link">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
            <div class="image-info">
                <p>👍 ${image.likes}</p>
                <p>👁️ ${image.views}</p>
                <p>💬 ${image.comments}</p>
                <p>⬇️ ${image.downloads}</p>
            </div>
          </a>
        </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const galleryItem = gallery.querySelector('.gallery-item');
  const cardHeight = galleryItem.getBoundingClientRect().height;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
