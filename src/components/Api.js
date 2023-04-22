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
    })
      .then(this._checkAnswer)
      .then((result) => {
        return {
          userName: result.name,
          userJob: result.about,
        };
      });
  }

  setUserInfo({ userJob, userName }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    })
      .then(this._checkAnswer)
      .then((result) => {
        return {
          userName: result.name,
          userJob: result.about,
        };
      });
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
}
