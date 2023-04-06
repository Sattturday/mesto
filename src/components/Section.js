export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();

    this._renderedItems.forEach((cardData) => {
      this._renderer(cardData);
    });
  }

  setItem(card) {
    this._container.prepend(card);
  }
}