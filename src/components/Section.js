export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this._clear();

    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
