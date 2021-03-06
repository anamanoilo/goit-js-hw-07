import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  divGallery: document.querySelector(".gallery"),
  galleryImg: document.querySelector(".gallery__image"),
  galleryLink: document.querySelector(".gallery__link"),
};

console.log(galleryItems);
const previewMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
              <a class="gallery__link" href="${original}">
                <img
                  class="gallery__image"
                  src="${preview}"
                  data-source="${original}"
                  alt="${description}"
                />
              </a>
            </div>`;
  })
  .join("");

refs.divGallery.insertAdjacentHTML("afterbegin", previewMarkup);

refs.divGallery.addEventListener("click", openModal);
let instance = null;

function openModal(event) {
  event.preventDefault();
  if (event.target.tagName !== "IMG") {
    return;
  }
  const originalLink = event.target.dataset.source;
  window.addEventListener("keydown", closeModalByEsc);

  instance = basicLightbox.create(
    `
    <img src="${originalLink}" width="800" height="600">
`,
    {
      onClose: () => {
        window.removeEventListener("keydown", closeModalByEsc);
      },
    }
  );

  instance.show();
}

function closeModalByEsc(e) {
  if (e.code === "Escape") {
    instance.close();
  }
}
