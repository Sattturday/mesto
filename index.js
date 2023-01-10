let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let profileEditButton = content.querySelector('.profile__edit-button');
let popupButtonClose = popup.querySelector('.popup__close');

function popupOpened(event) {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', popupOpened);
popupButtonClose.addEventListener('click', popupOpened);

// Находим форму в DOM
let popupForm = popup.querySelector('.popup__container');

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

    // Вставляем новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job;

    // Закрываем попап
    popup.classList.toggle('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleFormSubmit);

