// cards
const kamchatkaImage = new URL(
  '../images/cards-kamchatka.jpg',
  import.meta.url
);
const beloretskImage = new URL(
  '../images/cards-beloretsk.jpg',
  import.meta.url
);
const uralImage = new URL('../images/cards-ural.jpg', import.meta.url);
const pokrovImage = new URL('../images/cards-pokrov.jpg', import.meta.url);
const baikalLetoImage = new URL(
  '../images/cards-baikal-leto.jpg',
  import.meta.url
);
const baikalZimaImage = new URL(
  '../images/cards-baikal-zima.jpg',
  import.meta.url
);

export const initialCards = [
  {
    cardName: 'Камчатка',
    cardLink: kamchatkaImage,
  },
  {
    cardName: 'Белорецк',
    cardLink: beloretskImage,
  },
  {
    cardName: 'Урал',
    cardLink: uralImage,
  },
  {
    cardName: 'Покров',
    cardLink: pokrovImage,
  },
  {
    cardName: 'Летний Байкал',
    cardLink: baikalLetoImage,
  },
  {
    cardName: 'Байкал заледенел',
    cardLink: baikalZimaImage,
  },
];

export const templateSelector = '.card-template';
export const cardsSectionSelector = '.cards';

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
export const cardAddButton = document.querySelector('.profile__button_add');

// validation
export const profileForm = document.forms.profileForm;
export const cardAddForm = document.forms.cardAddForm;
export const validationConfig = {
  formSelector: '.popup__container', // form
  fieldSetSelector: '.popup__items', // fieldset
  inputSelector: '.popup__input', // input
  submitButtonSelector: '.popup__button', // submit
  inactiveButtonClass: 'popup__button_disabled', // submit disabled
  inputErrorClass: 'popup__input_type_error', // red border-bottom
  errorClass: 'popup__error_visible', // show mistakes
};
