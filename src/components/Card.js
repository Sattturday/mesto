export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.cardName;
    this._link = cardData.cardLink;
    this._template = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _fillCard = () => {
    this._view.querySelector('.cards__title').textContent = this._name;

    this._image = this._view.querySelector('.cards__image');
    this._image.src = this._link;
    this._image.alt = this._name;
  };

  _zoomCard = () => this._handleCardClick(this._link, this._name);

  _likeCard = () =>
    this._cardLikeElement.classList.toggle('cards__like_active');

  _deleteCard = () => {
    this._view.remove();
    this._view = null;
  };

  _setEventListeners = () => {
    this._image.addEventListener('click', this._zoomCard);

    this._cardLikeElement = this._view.querySelector('.cards__like');
    this._cardLikeElement.addEventListener('click', this._likeCard);

    this._view
      .querySelector('.cards__delete')
      .addEventListener('click', this._deleteCard);
  };

  createCard = () => {
    this._view = this._template.cloneNode(true).children[0];

    this._fillCard();

    this._setEventListeners();

    return this._view;
  };
}
