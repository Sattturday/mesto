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

  _request(url, options) {
    return fetch(`${this.baseUrl}${url}`, options).then(this._checkAnswer);
  }

  getUserInfo() {
    return this._request('/users/me', {
      headers: this.headers,
    });
  }

  setUserInfo({ userJob, userName }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    });
  }

  getInitialCards() {
    return this._request('/cards', {
      headers: this.headers,
    });
  }

  addCard({ cardName, cardLink }) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    });
  }

  _addLikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    }).then((res) => {
      return res.likes;
    });
  }

  _deleteLikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
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
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  updateAvatar({ avatarLink }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }
}
