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
  profileForm,
  cardAddForm,
  validationConfig,
  popupImageSelector,
  popupProfileSelector,
  profileNameSelector,
  profileJobSelector,
  popupAddCardSelector,
  templateSelector,
  popupConfirmationSelector,
  popupEditAvatarSelector,
  avatarForm,
  avatarEditButton,
  avatarSelector,
} from '../utils/constants.js';

const cards = {}; // хранение экземпляров Card

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e9e03bd6-0a44-4b6f-b71f-07a0b3838a9d',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([me, cards]) => {
  userInfo.remember(me);
  userInfo.setUserInfo();
  cardsSection.renderItems(cards);
});

const userInfo = new UserInfo(
  profileNameSelector,
  profileJobSelector,
  avatarSelector
);

const cardsSection = new Section(
  (cardItem) => cardsSection.setItem(generateCard(cardItem)),
  cardsSectionSelector
);

const popupEditProfile = new PopupWithForm(popupProfileSelector, (data) => {
  popupEditProfile.renderLoading(true);
  api
    .setUserInfo(data)
    .then((data) => {
      userInfo.remember(data);
      userInfo.setUserInfo();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
  popupEditProfile.close();
});

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  popupEditAvatar.renderLoading(true);
  api
    .updateAvatar(data)
    .then((avatarLink) => {
      userInfo.setAvatar(avatarLink);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
  popupEditAvatar.close();
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
      popupAddCard.renderLoading(false, 'Создать');
    });
  popupAddCard.close();
});

const popupWithConfirmation = new PopupWithConfirmation(
  popupConfirmationSelector,
  (cardId) => {
    popupWithConfirmation.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cards[cardId].deleteCard();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupWithConfirmation.renderLoading(false, 'Да');
      });
    popupWithConfirmation.close();
  }
);

const validatorProfileForm = new FormValidator(validationConfig, profileForm);
const validatorAvatarForm = new FormValidator(validationConfig, avatarForm);
const validatorCardAddForm = new FormValidator(validationConfig, cardAddForm);

// functions
const openPopupEditAvatar = () => {
  validatorAvatarForm.resetValidation();
  popupEditAvatar.open();
};

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

validatorProfileForm.enableValidation();
validatorAvatarForm.enableValidation();
validatorCardAddForm.enableValidation();

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
