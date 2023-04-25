import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import {
  cardsSectionSelector,
  profileEditButton,
  cardAddButton,
  validationConfig,
  popupImageSelector,
  popupProfileSelector,
  profileNameSelector,
  profileJobSelector,
  popupAddCardSelector,
  templateSelector,
  popupConfirmationSelector,
  popupEditAvatarSelector,
  avatarEditButton,
  avatarSelector,
} from '../utils/constants.js';

const cards = {}; // хранение экземпляров Card

// validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// classes
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e9e03bd6-0a44-4b6f-b71f-07a0b3838a9d',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userInfo.remember(me);
    userInfo.setUserInfo();
    cardsSection.renderItems(cards);
  })
  .catch((err) => console.error(err));

const userInfo = new UserInfo(
  profileNameSelector,
  profileJobSelector,
  avatarSelector
);

const cardsSection = new Section(
  (cardItem) => cardsSection.setItem(generateCard(cardItem)),
  cardsSectionSelector
);

const popupEditProfile = new PopupWithForm(
  popupProfileSelector,
  handleProfileFormSubmit
);

const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  handleAvatarFormSubmit
);

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupAddCard = new PopupWithForm(
  popupAddCardSelector,
  handleAddCardFormSubmit
);

const popupWithConfirmation = new PopupWithConfirmation(
  popupConfirmationSelector,
  handleConfirmationSubmit
);

// functions
function handleProfileFormSubmit(inputValues) {
  function makeRequest() {
    return api.setUserInfo(inputValues).then((userData) => {
      userInfo.remember(userData);
      userInfo.setUserInfo();
    });
  }
  handleSubmit(makeRequest, popupEditProfile);
}

function handleAvatarFormSubmit(inputValues) {
  function makeRequest() {
    return api.updateAvatar(inputValues).then((userData) => {
      userInfo.remember(userData);
      userInfo.setUserInfo();
    });
  }
  handleSubmit(makeRequest, popupEditAvatar);
}

function handleAddCardFormSubmit(inputValues) {
  function makeRequest() {
    return api.addCard(inputValues).then((cardData) => {
      cardsSection.setItem(generateCard(cardData));
    });
  }
  handleSubmit(makeRequest, popupAddCard);
}

function handleConfirmationSubmit(cardId) {
  function makeRequest() {
    return api.deleteCard(cardId).then(() => {
      cards[cardId].deleteCard();
    });
  }
  handleSubmit(makeRequest, popupWithConfirmation);
}

const handleSubmit = (request, popupInstance) => {
  popupInstance.renderLoading(true);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
};

const openPopupEditAvatar = () => {
  formValidators['avatarForm'].resetValidation();
  popupEditAvatar.open();
};

const openPopupEditProfile = () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profileForm'].resetValidation();
  popupEditProfile.open();
};

const openPopupAddCard = () => {
  formValidators['cardAddForm'].resetValidation();
  popupAddCard.open();
};

const generateCard = (cardData) => {
  const card = new Card(
    cardData,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleTrashClick,
    userInfo.id
  );
  cards[cardData._id] = card;
  return card.createCard();
};

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const handleLikeClick = (id, isLiked) => {
  api
    .toggleLikeCard(id, isLiked)
    .then((data) => {
      cards[id].updateLikeData(data);
      cards[id].updateLikeCard();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleTrashClick = (cardId) => {
  popupWithConfirmation.open(cardId);
};

// eventListeners
profileEditButton.addEventListener('click', openPopupEditProfile);
avatarEditButton.addEventListener('click', openPopupEditAvatar);
cardAddButton.addEventListener('click', openPopupAddCard);

popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupWithConfirmation.setEventListeners();

//# sourceMappingURL=/dist/app.js.map
