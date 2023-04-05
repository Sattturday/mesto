import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  cardsListSelector,
  profileEditButton,
  addCardButton,
  profileForm,
  addCardForm,
  config,
  popupImageSelector,
  popupProfileSelector,
  profileNameSelector,
  profileJobSelector,
  popupAddCardSelector,
} from '../utils/constants.js';

// profile
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

// edit profile
const popupEditProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validatorProfileForm.resetValidation();
  popupEditProfile.open();
});

// popupWithImage
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

// load cards
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, handleCardClick);
      const cardElement = card.newCard();
      cardList.setItem(cardElement);
    },
  },
  cardsListSelector
);

cardList.renderItems();

// add new card
const popupAddCard = new PopupWithForm(popupAddCardSelector, (data) => {
  const cardElement = new Card(data, handleCardClick);
  cardList.setItem(cardElement.newCard());
});
popupAddCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  validatorAddCardForm.resetValidation();
  popupAddCard.open();
});

// validation
const validatorProfileForm = new FormValidator(config, profileForm);
validatorProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, addCardForm);
validatorAddCardForm.enableValidation();
