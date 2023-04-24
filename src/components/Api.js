export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkAnswer);
  }

  setUserInfo({ userJob, userName }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    }).then(this._checkAnswer);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkAnswer);
  }

  addCard({ cardName, cardLink }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkAnswer);
  }

  _addLikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._checkAnswer)
      .then((res) => {
        return res.likes;
      });
  }

  _deleteLikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkAnswer)
      .then((res) => {
        return res.likes;
      });
  }

  toggleLikeCard(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLikeCard(cardId);
    } else {
      return this._addLikeCard(cardId);
    }
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._checkAnswer);
  }

  updateAvatar({ avatarLink }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkAnswer);
  }
}
