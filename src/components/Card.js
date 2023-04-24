export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleTrashClick,
    userId
  ) {
    this._id = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashClick = handleTrashClick;
    this._userId = userId;
  }

  _fillCard = () => {
    this._view.querySelector('.cards__title').textContent = this._name;
    this._trash = this._view.querySelector('.cards__delete');
    this._image = this._view.querySelector('.cards__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._cardLikeElement = this._view.querySelector('.cards__like-icon');
    this._likeCounter = this._view.querySelector('.cards__like-counter');
    this._likeCounter.textContent = this._likes.length;
    if (this._isLiked()) {
      this._cardLikeElement.classList.toggle('cards__like-icon_active');
    }

    if (this._owner._id !== this._userId) {
      this._trash.remove();
    }
  };

  _zoomCard = () => this._handleCardClick(this._link, this._name);

  _isLiked = () => {
    return this._likes.some((item) => item._id === this._userId);
  };

  updateLikeData = (newData) => {
    this._likes = newData;
  };

  updateLikeCard = () => {
    this._likeCounter.textContent = this._likes.length;
    this._cardLikeElement.classList.toggle('cards__like-icon_active');
  };

  deleteCard = () => {
    this._view.remove();
    this._view = null;
  };

  _setEventListeners = () => {
    this._image.addEventListener('click', this._zoomCard);

    this._cardLikeElement.addEventListener('click', () =>
      this._handleLikeClick(this._id, this._isLiked())
    );

    if (this._view.querySelector('.cards__delete')) {
      this._view
        .querySelector('.cards__delete')
        .addEventListener('click', () => this._handleTrashClick(this._id));
    }
  };

  createCard = () => {
    this._view = this._template.cloneNode(true).children[0];

    this._fillCard();

    this._setEventListeners();
    return this._view;
  };
}
