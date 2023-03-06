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

const popups = document.querySelectorAll('.popup'); // находим все попапы

const profileEditButton = document.querySelector('.profile__button_edit'); // находим кнопку редактирования профиля
const popupProfile = document.querySelector('.popup_for_edit-profile'); // находим попап профиля
const profileName = document.querySelector('.profile__info-name'); // находим имя в профиле
const profileJob = document.querySelector('.profile__info-job'); // находим род занятий в профиле
const profileForm = popupProfile.querySelector('.popup__container'); // Находим форму профиля
const inputProfileName = profileForm.querySelector('.popup__input_name'); // Находим поля формы профиля
const inputProfileJob = profileForm.querySelector('.popup__input_job'); // Находим поля формы профиля

const popupAddCard = document.querySelector('.popup_for_add-card'); // попап добавления карточки
const addCardButton = document.querySelector('.profile__button_add'); // находим кнопку добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__container'); // форма добавления карточек
const inputAddCardName = popupAddCard.querySelector('.popup__input_card-name'); // поле для имени карточки
const inputAddCardLink = popupAddCard.querySelector(
  '.popup__input_card-link-image'
); // поле для ссылки на изображение

const cardsList = document.querySelector('.cards'); // место для карточек
const cardTemplate = document.querySelector('.card-template').content; // находим содержимое темплейта с карточкий
const popupImage = document.querySelector('.popup_for_full-image'); // попап с картинкой
const fullImage = popupImage.querySelector('.popup__full-image'); // image in popup
const fullImageCaption = popupImage.querySelector('.popup__caption'); // caption in popup
