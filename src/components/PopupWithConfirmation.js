import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleDeleteCard) {
    super(selector);
    this._handleDeleteCard = handleDeleteCard;
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector('.popup__button')
      .addEventListener('click', () => this._handleDeleteCard(this._cardId));
  }
}
