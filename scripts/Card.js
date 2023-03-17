class Card {
  static _template = document.querySelector('.card-template').content;

  constructor(element) {
    this._name = element.name;
    this._link = element.link;
  }

  newCard() {
    this._view = Card._template.cloneNode(true).children[0];

    return this._view;
  }
}

// const createCard = (element) => {
//   const cardElement = cardTemplate
//     .querySelector('.cards__item')
//     .cloneNode(true);
//   cardElement.querySelector('.cards__title').textContent = element.name;

//   const cardImage = cardElement.querySelector('.cards__image');
//   cardImage.setAttribute('src', element.link);
//   cardImage.setAttribute('alt', element.name);

//   cardImage.addEventListener('click', () =>
//     handleCardClick(element.link, element.name)
//   );

//   cardElement.querySelector('.cards__like').addEventListener('click', (evt) => {
//     evt.target.classList.toggle('cards__like_active');
//   });

//   cardElement
//     .querySelector('.cards__delete')
//     .addEventListener('click', (evt) => {
//       const card = evt.target.closest('.cards__item');
//       card.remove();
//     });

//   return cardElement;
// };

export default Card;
