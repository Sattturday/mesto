let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let profileEditButton = content.querySelector('.profile__edit-button');
let popupButtonClose = popup.querySelector('.popup__close');
let popupButtonSave = popup.querySelector('.popup__button-save');

function popupOpened() {
  popup.classList.toggle('popup_opened');
}

function profileSave() {

}

profileEditButton.addEventListener('click', popupOpened);
popupButtonClose.addEventListener('click', popupOpened);
