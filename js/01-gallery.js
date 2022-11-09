import { galleryItems } from './gallery-items.js';

const galleryListItem = document.querySelector('.gallery');

//add markup________________________________________
const createGalleryListItem = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join('');

galleryListItem.insertAdjacentHTML('afterbegin', `${createGalleryListItem}`);

// open modal Lightbox

galleryListItem.addEventListener('click', onImageClick);

function onImageClick(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) return;

  const imgLink = `<img src="${e.target.dataset.source}">`;

  const modalLightbox = basicLightbox.create(imgLink, {
    onShow: () => {
      document.addEventListener('keydown', onModalLightboxClose);
      console.log(`addEventListener`);
    },
    onClose: () => {
      document.removeEventListener('keydown', onModalLightboxClose);
      console.log(`removeEventListener`);
    },
  });

  modalLightbox.show();

  function onModalLightboxClose(event) {
    if (event.code === 'Escape') {
      modalLightbox.close();
    }
  }

//   VARIANT 1
  // const modalLightbox = basicLightbox.create(
  //   `<img src="${image.target.dataset.source}">`
  // );

  // modalLightbox.show();

  // document.addEventListener('keydown', (event) => {
  //   if (event.code === 'Escape') {
  //     modalLightbox.close();
  //   }
  // });
}
