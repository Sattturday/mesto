import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
  validatorProfileForm.resetValidation();
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
  fullImage.src = link;
  fullImage.alt = name;
  fullImageCaption.textContent = name;
  openPopup(popupImage);
};

// вставляем карточки при загрузке
initialCards.forEach((element) => {
  const cardElement = new Card(element, handleCardClick);
  cardsList.append(cardElement.newCard());
});

// добавление новых карточек
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const element = {
    name: inputAddCardName.value,
    link: inputAddCardLink.value,
  };

  const cardElement = new Card(element, handleCardClick);
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
  validatorAddCardForm.resetValidation();
  openPopup(popupAddCard);
});

profileForm.addEventListener('submit', handleFormEditSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

const validatorProfileForm = new FormValidator(config, profileForm);
validatorProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, addCardForm);
validatorAddCardForm.enableValidation();
