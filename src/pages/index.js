import './index.css';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
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

// variables

// classes
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

const cardsSection = new Section(
  {
    data: initialCards,
    renderer: (cardData) => {
      cardsSection.setItem(generateCard(cardData));
    },
  },
  cardsSectionSelector
);

const popupEditProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupAddCard = new PopupWithForm(popupAddCardSelector, (cardData) => {
  cardsSection.setItem(generateCard(cardData));
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

cardsSection.renderItems();
validatorProfileForm.enableValidation();
validatorCardAddForm.enableValidation();

// eventListeners
profileEditButton.addEventListener('click', openPopupEditProfile);
cardAddButton.addEventListener('click', openPopupAddCard);

popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
