let content = document.querySelector('.content');
let popup = content.querySelector('.popup'); // Находим попап
let profileEditButton = content.querySelector('.profile__edit-button'); // Находим кнопку редактирования профиля
let popupButtonClose = popup.querySelector('.popup__close'); // Нахоидим кнопку закрытия формы
let popupForm = popup.querySelector('.popup__container'); // Находим форму в DOM

function popupOpened(event) {
  event.preventDefault(); // Отменяем поведение браузера по умолчанию
  popup.classList.toggle('popup_opened'); // Добавляем/удаляем класс popup_opened
  popupForm.reset(); // Сбрасываем форму
}

profileEditButton.addEventListener('click', popupOpened); // Клик кнопки редактирования профиля
popupButtonClose.addEventListener('click', popupOpened); // Клик кнопки закрытия формы

// Находим поля формы в DOM
let nameInput = popupForm.querySelector('.popup__input_name');
let jobInput = popupForm.querySelector('.popup__input_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (event) {
    event.preventDefault(); // Отменяем поведение браузера по умолчанию

    // Получаем значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // Выбераем элементы, куда должны быть вставлены значения полей
    let profileName = content.querySelector('.profile__info-name');
    let profileJob = content.querySelector('.profile__info-job');

    // Меняем значение атрибутов placeholder
    nameInput.setAttribute('placeholder', name);
    jobInput.setAttribute('placeholder', job);

    // Вставляем новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job;

    popup.classList.toggle('popup_opened'); // Закрываем попап, удаляя класс popup_opened
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleFormSubmit);

