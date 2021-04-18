// получение ссылок
const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lidhtboxImg = lightboxEl.querySelector('.lightbox__image');
const lightboxCloseBtn = lightboxEl.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = lightboxEl.querySelector('.lightbox__overlay');
// создание галлереи по макету
import items from '../gallery-items.js';
const galleryItemsLi = items.map(item => {
    const element = document.createElement("li");
    element.classList.add('gallery__item');
    const elementA = document.createElement("a");
    elementA.classList.add('gallery__link');
    elementA.href = item.original;
    const elementImg = document.createElement("img");
    elementImg.classList.add('gallery__image');
    elementImg.src = item.preview;
    elementImg.dataset.surce = item.original;
    elementImg.alt = item.description; 
    elementA.appendChild(elementImg);
    element.appendChild(elementA); 
    return element;
});
//получение списка ссылок
const imageUrlList = items.map(item =>  item.original );
let imageUrl = '';
const imageAltList = items.map(item =>  item.description );
let imageAlt = '';
//добасление шаблона в нтмл
galleryEl.append(...galleryItemsLi);
//Открытие модального окна.
function openModal() {
    lightboxEl.classList.add('is-open');
    window.addEventListener('keydown', checkKey);
    lightboxCloseBtn.addEventListener('click', closeModal);
    lightboxOverlayEl.addEventListener('click', closeModal);
};
//Закрытие модального окна .
function closeModal() {
    lightboxEl.classList.remove('is-open');
    window.removeEventListener('keydown', checkKey);
    lightboxCloseBtn.removeEventListener('click', closeModal);
    lightboxOverlayEl.removeEventListener('click', closeModal);
};
//делигирование
galleryEl.addEventListener('click', onClick);

function onClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    imageUrl = evt.target.dataset.surce;
    imageAlt = evt.target.alt;
    clearModalImageSrc();
    openModal();
    //Подмена значения атрибутов элемента img.lightbox__image.
    lidhtboxImg.src = imageUrl;
    lidhtboxImg.alt = imageAlt;
};
//Очистка значения атрибутов элемента img.lightbox__image.
function clearModalImageSrc() {
    lidhtboxImg.src = "";
    lidhtboxImg.alt = "";
};
//Доп
function checkKey({ key }) {
    //выход по Еск
    if (key === 'Escape') { closeModal(); return; }
    //Пролистывание
    if (imageUrl === '') { return; }
    let i = imageUrlList.indexOf(imageUrl);
    if (key === 'ArrowLeft') {
        if (i > 0) {
            imageUrl = imageUrlList[i - 1];
            imageAlt = imageAltList[i - 1];
        }
        else {
            imageUrl = imageUrlList[imageUrlList.length - 1];
            imageAlt = imageAltList[imageUrlList.length - 1];
        }
    }
    if (key === 'ArrowRight') {
        if (i < imageUrlList.length - 1) {
            imageUrl = imageUrlList[i + 1];
            imageAlt = imageAltList[i + 1];
        } else {
            imageUrl = imageUrlList[0];
            imageAlt = imageAltList[0];
        }
    }
    lidhtboxImg.src = imageUrl;
    lidhtboxImg.alt = imageAlt;
};


