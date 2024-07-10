import { getPicturesByQuery } from './js/pixabay-api';
import { showImages } from './js/render-functions';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';


import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

export const searchForm = document.querySelector('.form');
export const formInput = document.querySelector('.form-input');
export const loader = document.querySelector('.loader');
export const gallery = document.querySelector('.gallery');

loader.style.display = 'none';

searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(event) {
  event.preventDefault();

  const queryValue = formInput.value.toLowerCase().trim();

  if (queryValue === '') {
    iziToast.error({
      message: 'Please complete the field!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = '';
  showLoader();

  getPicturesByQuery(queryValue)
    .then(data => {
      console.log(data);
      if (!data.this.length) {
        iziToast.error({
          position: 'topRight',
          maxWidth: '432px',
          backgroundColor: 'red',
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      showImages(data.this);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong.',
      });
    })
    .finally(() => {
      offShowLoader();
    });
}

export function showLoader() {
  if (loader) {
    loader.style.display = 'block';
  }
}

function offShowLoader() {
  if (loader) {
    loader.style.display = 'none';
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
