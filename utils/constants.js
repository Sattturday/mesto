// cards

export const initialCards = [
  {
    cardName: 'Камчатка',
    cardLink: './images/cards-kamchatka.jpg',
  },
  {
    cardName: 'Белорецк',
    cardLink: './images/cards-beloretsk.jpg',
  },
  {
    cardName: 'Урал',
    cardLink: './images/cards-ural.jpg',
  },
  {
    cardName: 'Покров',
    cardLink: './images/cards-pokrov.jpg',
  },
  {
    cardName: 'Летний Байкал',
    cardLink: './images/cards-baikal-leto.jpg',
  },
  {
    cardName: 'Байкал заледенел',
    cardLink: './images/cards-baikal-zima.jpg',
  },
];

export const cardsListSelector = '.cards';

// popups
export const popupImageSelector = '.popup_for_full-image';
export const popupProfileSelector = '.popup_for_edit-profile';
export const popupAddCardSelector = '.popup_for_add-card';

// profile
export const profileNameSelector = '.profile__info-name';
export const profileJobSelector = '.profile__info-job';

// buttons
export const profileEditButton = document.querySelector(
  '.profile__button_edit'
);
export const addCardButton = document.querySelector('.profile__button_add');

// validation
export const profileForm = document.forms.profileForm;
export const addCardForm = document.forms.addCardForm;
export const config = {
  formSelector: '.popup__container', // form
  fieldSetSelector: '.popup__items', // fieldset
  inputSelector: '.popup__input', // input
  submitButtonSelector: '.popup__button', // submit
  inactiveButtonClass: 'popup__button_disabled', // submit disabled
  inputErrorClass: 'popup__input_type_error', // red border-bottom
  errorClass: 'popup__error_visible', // show mistakes
};
