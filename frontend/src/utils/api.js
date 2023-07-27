class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.apiToken = options.headers.authorization;
    this.contentType = options.headers.contentType;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.message}` );
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editProfile({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(cardId, likeStatus) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: `${likeStatus ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://api.irina-sakhno.students.nomoreparties.sbs",
  // baseUrl: "http://localhost:3001",
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

export default api;
