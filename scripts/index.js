import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const popups = document.querySelectorAll('.popup'); // все попапы

const profileEditButton = document.querySelector('.profile__button_edit'); // кнопкa ред. профиля
const popupProfile = document.querySelector('.popup_for_edit-profile'); // попап профиля
const profileName = document.querySelector('.profile__info-name'); // имя в профиле
const profileJob = document.querySelector('.profile__info-job'); // род занятий в профиле
const profileForm = popupProfile.querySelector('.popup__container'); // формa профиля
const inputProfileName = profileForm.querySelector('.popup__input_name'); // поля формы профиля
const inputProfileJob = profileForm.querySelector('.popup__input_job'); // поля формы профиля

const popupAddCard = document.querySelector('.popup_for_add-card'); // попап добавления карточки
const addCardButton = document.querySelector('.profile__button_add'); // кнопкa добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__container'); // добавления карточек
const inputAddCardName = popupAddCard.querySelector('.popup__input_card-name'); // поле имени карточки
const inputAddCardLink = popupAddCard.querySelector(
  '.popup__input_card-link-image'
); // поле для ссылки

const cardsList = document.querySelector('.cards'); // место для карточек
const cardTemplate = document.querySelector('.card-template').content; // темплейт с карточкий
const popupImage = document.querySelector('.popup_for_full-image'); // попап с картинкой
const fullImage = popupImage.querySelector('.popup__full-image'); // image in popup
const fullImageCaption = popupImage.querySelector('.popup__caption'); // caption in popup

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const handleEditProfile = () => {
  profileForm.reset();
  inputProfileName.setAttribute('value', profileName.textContent);
  inputProfileJob.setAttribute('value', profileJob.textContent);
  //  resetValidation(profileForm, validationOptions);
  openPopup(popupProfile);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// обработчик клика на картинку карточки
const handleCardClick = (link, name) => {
  fullImage.setAttribute('src', link);
  fullImage.setAttribute('alt', name);
  fullImageCaption.textContent = name;
  openPopup(popupImage);
};

// вставляем карточки при загрузке
initialCards.forEach((element) => {
  const cardElement = new Card(element);
  cardsList.append(cardElement.newCard());
});

// добавление новых карточек
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const element = {
    name: inputAddCardName.value,
    link: inputAddCardLink.value,
  };

  const cardElement = new Card(element);
  cardsList.prepend(cardElement.newCard());

  addCardForm.reset();
  closePopup(popupAddCard);
};

const handleFormEditSubmit = (evt) => {
  evt.preventDefault();

  const name = inputProfileName.value;
  const job = inputProfileJob.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(popupProfile);
};

profileEditButton.addEventListener('click', handleEditProfile);
addCardButton.addEventListener('click', () => {
  //  resetValidation(addCardForm, validationOptions);
  openPopup(popupAddCard);
});

profileForm.addEventListener('submit', handleFormEditSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

//enableValidation(validationOptions);
