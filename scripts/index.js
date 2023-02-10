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

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true); // Клонируем содержимое

  cardElement.querySelector('.cards__title').textContent = element.name; // Вписываем название карточки

  const cardImage = cardElement.querySelector('.cards__image'); // Находим имг
  cardImage.setAttribute('src', element.link); // Вставляем ссылку на изображение
  cardImage.setAttribute('alt', element.name); // Вставляем значение атрибута alt

  cardElement.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });

  cardsList.append(cardElement);
})

const popup = content.querySelector('.popup'); // Находим попап
const popupForm = popup.querySelector('.popup__container'); // Находим форму в DOM

function popupStateChange() {
  popup.classList.toggle('popup_opened'); // Добавляем/удаляем класс popup_opened
  popupForm.reset(); // Сбрасываем форму
}

const profileEditButton = content.querySelector('.profile__button_edit'); // Находим кнопку редактирования профиля
const popupButtonClose = popup.querySelector('.popup__close'); // Нахоидим кнопку закрытия формы

profileEditButton.addEventListener('click', popupStateChange); // Клик кнопки редактирования профиля
popupButtonClose.addEventListener('click', popupStateChange); // Клик кнопки закрытия формы

//закрытие попапа по клику на оверлей
const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    popupStateChange();
  }
}

popup.addEventListener('click', handleOverlayClick); // Клик по оверлею

const nameInput = popupForm.querySelector('.popup__input_name'); // Находим поля формы в DOM
const jobInput = popupForm.querySelector('.popup__input_job'); // Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
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
  popupStateChange();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleFormSubmit);

