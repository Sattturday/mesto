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
  resetValidation(profileForm, validationOptions);
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

const createCard = (element) => {
  const cardElement = cardTemplate
    .querySelector('.cards__item')
    .cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = element.name;

  const cardImage = cardElement.querySelector('.cards__image');
  cardImage.setAttribute('src', element.link);
  cardImage.setAttribute('alt', element.name);

  cardImage.addEventListener('click', () =>
    handleCardClick(element.link, element.name)
  );

  cardElement.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like_active');
  });

  cardElement
    .querySelector('.cards__delete')
    .addEventListener('click', (evt) => {
      const card = evt.target.closest('.cards__item');
      card.remove();
    });

  return cardElement;
};

// вставляем карточки при загрузке
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  cardsList.append(cardElement);
});

// добавление новых карточек
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const element = {
    name: inputAddCardName.value,
    link: inputAddCardLink.value,
  };

  const cardElement = createCard(element);
  cardsList.prepend(cardElement);

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
  resetValidation(addCardForm, validationOptions);
  openPopup(popupAddCard);
});

profileForm.addEventListener('submit', handleFormEditSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

enableValidation(validationOptions);
