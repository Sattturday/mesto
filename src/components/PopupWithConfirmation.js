import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleDeleteCard) {
    super(selector);
    this._handleDeleteCard = handleDeleteCard;
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = 'Да';
    }
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', () =>
      this._handleDeleteCard(this._cardId)
    );
  }
}
