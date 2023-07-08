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
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.apiToken,
        "Content-Type": this.contentType,
      },
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
      headers: {
        authorization: this.apiToken,
        "Content-Type": this.contentType,
      },
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
      headers: {
        authorization: this.apiToken,
        "Content-Type": this.contentType,
      },
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
      headers: {
        authorization: this.apiToken,
        "Content-Type": this.contentType,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.apiToken,
        "Content-Type": this.contentType,
      },
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "e039fbc5-c9a5-4fc5-afa9-2046730c027f",
    contentType: "application/json",
  },
});

export default api;
