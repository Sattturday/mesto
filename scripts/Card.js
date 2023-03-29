class Card {
  static _template = document.querySelector('.card-template').content;

  constructor(element, handleCardClick) {
    this._name = element.name;
    this._link = element.link;
    this._handleCardClick = handleCardClick;
  }

  _fillCard = () => {
    this._view.querySelector('.cards__title').textContent = this._name;

    this._image = this._view.querySelector('.cards__image');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
  };

  _zoomCard = () => this._handleCardClick(this._link, this._name);

  _likeCard = (evt) => evt.target.classList.toggle('cards__like_active');

  _deleteCard = (evt) => {
    this._card = evt.target.closest('.cards__item');
    this._card.remove();
    this._card = null;
  };

  _setEventListeners = () => {
    this._image.addEventListener('click', this._zoomCard);

    this._view
      .querySelector('.cards__like')
      .addEventListener('click', this._likeCard);

    this._view
      .querySelector('.cards__delete')
      .addEventListener('click', this._deleteCard);
  };

  newCard = () => {
    this._view = Card._template.cloneNode(true).children[0];

    this._fillCard();

    this._setEventListeners();

    return this._view;
  };
}

export default Card;
