let content = document.querySelector('.content');
let popup = content.querySelector('.popup'); // Находим попап
let profileEditButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
let popupButtonClose = popup.querySelector('.popup__close'); // Нахоидим кнопку закрытия формы
let popupForm = popup.querySelector('.popup__container'); // Находим форму в DOM
let nameInput = popupForm.querySelector('.popup__input_name'); // Находим поля формы в DOM
let jobInput = popupForm.querySelector('.popup__input_job'); // Находим поля формы в DOM

function popupStateChange() {
  popup.classList.toggle('popup_opened'); // Добавляем/удаляем класс popup_opened
  popupForm.reset(); // Сбрасываем форму
}

profileEditButton.addEventListener('click', popupStateChange); // Клик кнопки редактирования профиля
popupButtonClose.addEventListener('click', popupStateChange); // Клик кнопки закрытия формы

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Выбераем элементы, куда должны быть вставлены значения полей
  let profileName = content.querySelector('.profile__info-name');
  let profileJob = content.querySelector('.profile__info-job');

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

