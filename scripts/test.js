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

const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content; // находим содержимое темплейта с карточкий

const popups = document.querySelectorAll('.popup'); // находим все попапы

const popupProfile = document.querySelector('.popup_for_edit-profile'); // находим попап профиля
const profileEditButton = document.querySelector('.profile__button_edit'); // находим кнопку редактирования профиля

const popupAddCard = document.querySelector('.popup_for_add-card'); // попап добавления карточки
const cardAddButton = document.querySelector('.profile__button_add'); // находим кнопку добавления карточки

const popupImage = document.querySelector('.popup_for_full-image'); // попап с картинкой
const fullImage = popupImage.querySelector('.popup__full-image'); // image in popup
const fullImageCaption = popupImage.querySelector('.popup__caption'); // caption in popup


profileEditButton.addEventListener('click', () => popupProfile.classList.add('popup_opened')); // открытие попапа профиля
cardAddButton.addEventListener('click', () => popupAddCard.classList.add('popup_opened')); // открытие попапа добавления карточки

// закрытие попапа
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

// редактирование попапа с картинкой
function handleCardClick(link, name) {
  fullImage.setAttribute('src', link); // Вставляем ссылку на изображение
  fullImage.setAttribute('alt', name); // Прописываем изображению alt
  fullImageCaption.textContent = name; // Вставляем значение атрибута alt

  popupImage.classList.add('popup_opened');
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

  // удаление карточек
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





