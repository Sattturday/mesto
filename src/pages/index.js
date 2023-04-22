import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {
  // initialCards,
  cardsSectionSelector,
  profileEditButton,
  cardAddButton,
  profileForm,
  cardAddForm,
  validationConfig,
  popupImageSelector,
  popupProfileSelector,
  profileNameSelector,
  profileJobSelector,
  popupAddCardSelector,
  templateSelector,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e9e03bd6-0a44-4b6f-b71f-07a0b3838a9d',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([me, cards]) => {
  userInfo.setUserInfo(me);
  cardsSection.renderItems(cards);
});

const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const cardsSection = new Section(
  (cardItem) => cardsSection.setItem(generateCard(cardItem)),
  cardsSectionSelector
);

const popupEditProfile = new PopupWithForm(popupProfileSelector, (data) => {
  popupEditProfile.renderLoading(true);
  api
    .setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
  popupEditProfile.renderLoading(false);
  popupEditProfile.close();
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupAddCard = new PopupWithForm(popupAddCardSelector, (cardData) => {
  popupAddCard.renderLoading(true);
  api
    .addCard(cardData)
    .then((cardData) => {
      cardsSection.setItem(generateCard(cardData));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
  popupAddCard.close();
});

const validatorProfileForm = new FormValidator(validationConfig, profileForm);
const validatorCardAddForm = new FormValidator(validationConfig, cardAddForm);

// functions
const openPopupEditProfile = () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validatorProfileForm.resetValidation();
  popupEditProfile.open();
};

const openPopupAddCard = () => {
  validatorCardAddForm.resetValidation();
  popupAddCard.open();
};

const generateCard = (cardData) => {
  const card = new Card(cardData, templateSelector, handleCardClick);
  return card.createCard();
};

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

validatorProfileForm.enableValidation();
validatorCardAddForm.enableValidation();

// eventListeners
profileEditButton.addEventListener('click', openPopupEditProfile);
cardAddButton.addEventListener('click', openPopupAddCard);

popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();

console.log('hi, people! ПР9 tonight :)');

//# sourceMappingURL=/dist/app.js.map
