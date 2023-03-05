const initialCards = [
  {
    name: 'Камчатка',
    link: './images/cards-kamchatka.jpg',
  },
  {
    name: 'Белорецк',
    link: './images/cards-beloretsk.jpg',
  },
  {
    name: 'Урал',
    link: './images/cards-ural.jpg',
  },
  {
    name: 'Покров',
    link: './images/cards-pokrov.jpg',
  },
  {
    name: 'Летний Байкал',
    link: './images/cards-baikal-leto.jpg',
  },
  {
    name: 'Байкал заледенел',
    link: './images/cards-baikal-zima.jpg',
  },
];

const validationOptions = {
  formSelector: '.popup__container', // form
  fieldSetSelector: '.popup__items', // fieldset
  inputSelector: '.popup__input', // input
  submitButtonSelector: '.popup__button', // submit
  inactiveButtonClass: 'popup__button_disabled', // submit disabled
  inputErrorClass: 'popup__input_type_error', // red border-bottom
  errorClass: 'popup__error_visible', // show mistakes
};
