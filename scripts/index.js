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

const content = document.querySelector('.content');
const cardsList = content.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content; // Находим содержимое темплейта с карточкий

initialCards.forEach((element) => {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true); // Клонируем содержимое

  cardElement.querySelector('.cards__title').textContent = element.name; // Вписываем название карточки

  const cardImage = cardElement.querySelector('.cards__image'); // Находим имг
  cardImage.setAttribute('src', element.link); // Вставляем ссылку на изображение
  cardImage.setAttribute('alt', element.name); // Вставляем значение атрибута alt

  cardElement.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like_active');
  });

  cardElement.querySelector('.cards__delete').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  });

  cardsList.append(cardElement);
})


// Попап редактирования профиля
const popupEdit = content.querySelector('.popup_for_edit-profile'); // Находим попап редактирования
const popupForm = popupEdit.querySelector('.popup__container'); // Находим форму

const changePopupEditState = () => {
  popupEdit.classList.toggle('popup_opened'); // Добавляем/удаляем класс popup_opened
}

const profileEditButton = content.querySelector('.profile__button_edit'); // Находим кнопку редактирования профиля
const popupButtonClose = popupEdit.querySelector('.popup__close'); // Нахоидим кнопку закрытия формы

profileEditButton.addEventListener('click', changePopupEditState); // Клик кнопки редактирования профиля
popupButtonClose.addEventListener('click', changePopupEditState); // Клик кнопки закрытия формы

//закрытие попапа по клику на оверлей
const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    changePopupEditState();
  }
}

popupEdit.addEventListener('click', handleOverlayClick); // Клик по оверлею

const nameInput = popupForm.querySelector('.popup__input_name'); // Находим поля формы в DOM
const jobInput = popupForm.querySelector('.popup__input_job'); // Находим поля формы в DOM

// Обработчик «отправки» формы редактирования профиля
const handleFormEditSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выбераем элементы, куда должны быть вставлены значения полей
  const profileName = content.querySelector('.profile__info-name');
  const profileJob = content.querySelector('.profile__info-job');

  // Вставляем новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  // Меняем значение атрибутов value
  nameInput.setAttribute('value', name);
  jobInput.setAttribute('value', job);

  // Закрываем попап
  changePopupEditState();
}

popupForm.addEventListener('submit', handleFormEditSubmit); // Прикрепляем обработчик к форме


// открытие попапа с полным изображением
const popupImage = content.querySelector('.popup_for_full-image'); // находим попап
const fullImage = popupImage.querySelector('.popup__full-image'); // image in popup
const fullImageCaption = popupImage.querySelector('.popup__caption'); // caption in popup
const popupImageButtonClose = popupImage.querySelector('.popup__close'); // Нахоидим кнопку закрытия popupImage
const cardsImages = content.querySelectorAll('.cards__image'); // Находим all images

const changePopupImageState = () => {
  popupImage.classList.toggle('popup_opened');  // Открытие-закрытие попапа
}

const editPopupImage = (event) => {
  const link = event.target.getAttribute('src');
  const caption = event.target.getAttribute('alt');

  fullImage.setAttribute('src', link); // Вставляем ссылку на изображение
  fullImage.setAttribute('alt', caption); // Прописываем изображению alt
  fullImageCaption.textContent = caption; // Вставляем значение атрибута alt
}

cardsImages.forEach((element) => element.addEventListener('click', editPopupImage)); // подготовка соответсвующего попапа
cardsImages.forEach((element) => element.addEventListener('click', changePopupImageState)); // открытие попапа по клику на изображение карточки
popupImageButtonClose.addEventListener('click', changePopupImageState); // закрытие попапа


// Теперь попап добавления карточки
const popupAdd = content.querySelector('.popup_for_add-card'); // Находим попап добавления
const popupAddForm = popupAdd.querySelector('.popup__container'); // Находим форму добавления

const changePopupAddState = () => {
  popupAdd.classList.toggle('popup_opened');
  popupAddForm.reset()
}

const addButton = content.querySelector('.profile__button_add'); // Находим кнопку добавления карточки
const popupAddButtonClose = popupAdd.querySelector('.popup__close'); // Нахоидим кнопку закрытия формы

addButton.addEventListener('click', changePopupAddState);
popupAddButtonClose.addEventListener('click', changePopupAddState);

const handleOverlayAddClick = (event) => {
  if (event.target === event.currentTarget) {
    changePopupAddState();
  }
}

popupAdd.addEventListener('click', handleOverlayAddClick); // Клик по оверлею

// Находим поля формы
const cardName = popupAddForm.querySelector('.popup__input_card-name');
const cardLinkImage = popupAddForm.querySelector('.popup__input_card-link-image');

// Обработчик «отправки» формы создания карточки
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();

  // Получаем значение полей cardName и cardLinkImage из свойства value
  let name = cardName.value;
  let link = cardLinkImage.value;

  // Готовим карточку
  const newCard = cardTemplate.querySelector('.cards__item').cloneNode(true); // Клонируем содержимое template

  newCard.querySelector('.cards__title').textContent = name; // Вписываем название карточки

  const cardImage = newCard.querySelector('.cards__image'); // Находим имг
  cardImage.setAttribute('src', link); // Вставляем ссылку на изображение
  cardImage.setAttribute('alt', name); // Вставляем значение атрибута alt

  newCard.querySelector('.cards__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like_active');
  });

  cardImage.addEventListener('click', editPopupImage); // при клике на изображение делаем соответствующий попап
  cardImage.addEventListener('click', changePopupImageState); // и открываем этот попап

  newCard.querySelector('.cards__delete').addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  }); // удаление карточки

  // Вставляем карточку
  cardsList.prepend(newCard);

  // Закрываем попап
  changePopupAddState();
}

popupAddForm.addEventListener('submit', handleFormAddSubmit); // Прикрепляем обработчик к форме

