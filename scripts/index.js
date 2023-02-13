const initialCards = [
  {
    name: 'Камчатка',
    link: './images/cards-kamchatka.jpg'
  },
  {
    name: 'Белорецк',
    link: './images/cards-beloretsk.jpg'
  },
  {
    name: 'Урал',
    link: './images/cards-ural.jpg'
  },
  {
    name: 'Покров',
    link: './images/cards-pokrov.jpg'
  },
  {
    name: 'Летний Байкал',
    link: './images/cards-baikal-leto.jpg'
  },
  {
    name: 'Байкал заледенел',
    link: './images/cards-baikal-zima.jpg'
  }
];

const popups = document.querySelectorAll('.popup'); // находим все попапы

const profileEditButton = document.querySelector('.profile__button_edit'); // находим кнопку редактирования профиля
const popupProfile = document.querySelector('.popup_for_edit-profile'); // находим попап профиля
const profileName = document.querySelector('.profile__info-name'); // находим имя в профиле
const profileJob = document.querySelector('.profile__info-job');// находим род занятий в профиле
const profileForm = popupProfile.querySelector('.popup__container'); // Находим форму профиля
const inputProfileName = profileForm.querySelector('.popup__input_name'); // Находим поля формы профиля
const inputProfileJob = profileForm.querySelector('.popup__input_job'); // Находим поля формы профиля

const popupAddCard = document.querySelector('.popup_for_add-card'); // попап добавления карточки
const addCardButton = document.querySelector('.profile__button_add'); // находим кнопку добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__container'); // форма добавления карточек
const inputAddCardName = popupAddCard.querySelector('.popup__input_card-name'); // поле для имени карточки
const inputAddCardLink = popupAddCard.querySelector('.popup__input_card-link-image'); // поле для ссылки на изображение

const cardsList = document.querySelector('.cards'); // место для карточек
const cardTemplate = document.querySelector('.card-template').content; // находим содержимое темплейта с карточкий
const popupImage = document.querySelector('.popup_for_full-image'); // попап с картинкой
const fullImage = popupImage.querySelector('.popup__full-image'); // image in popup
const fullImageCaption = popupImage.querySelector('.popup__caption'); // caption in popup

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', () => openPopup(popupProfile));
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// обработчик клика на картинку карточки
const handleCardClick = (link, name) => {
  fullImage.setAttribute('src', link); // Вставляем ссылку на изображение
  fullImage.setAttribute('alt', name); // Прописываем изображению alt
  fullImageCaption.textContent = name; // Вставляем значение атрибута alt
  openPopup(popupImage);
}

// создаем карточку
const createCard = (element) => {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true); // Клонируем содержимое
  cardElement.querySelector('.cards__title').textContent = element.name; // Вписываем название карточки

  const cardImage = cardElement.querySelector('.cards__image'); // Находим имг
  cardImage.setAttribute('src', element.link); // Вставляем ссылку на изображение
  cardImage.setAttribute('alt', element.name); // Вставляем значение атрибута alt

  // просмотр полного изображения
  cardImage.addEventListener('click', () => handleCardClick(element.link, element.name));

  // лайки
  cardElement.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like_active');
  });

  // удаление
  cardElement.querySelector('.cards__delete').addEventListener('click', (evt) => {
    const card = evt.target.closest('.cards__item');
    card.remove();
  });

  return cardElement;
}

// вставляем карточки при загрузке
initialCards.forEach((element) => {
  const cardElement = createCard(element)
  cardsList.append(cardElement);
})

// обработчик «отправки» формы создания карточки
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  // получаем значение полей из свойства value и записываем в объект
  const element = {
    name: inputAddCardName.value,
    link: inputAddCardLink.value
  };

  // готовим карточку и вставляем ee
  const cardElement = createCard(element);
  cardsList.prepend(cardElement);

  addCardForm.reset();
  closePopup(popupAddCard);
}

addCardForm.addEventListener('submit', handleAddCardSubmit); // Прикрепляем обработчик к форме

// Обработчик «отправки» формы редактирования профиля
const handleFormEditSubmit = (evt) => {
  evt.preventDefault();

  // Получаем значение полей из свойства value
  const name = inputProfileName.value;
  const job = inputProfileJob.value;

  // Вставляем новые значения в профиль с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(popupProfile);
}

profileForm.addEventListener('submit', handleFormEditSubmit); // Прикрепляем обработчик к форме


