class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${JSON.stringify(res)}` );
  }

  registerNewUser = ({ email, password }) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  };

  authorizeExistingUser = ({ email, password }) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  };

  checkToken = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  };
}

const auth = new Auth({
     baseUrl: "https://api.irina-sakhno.students.nomoreparties.sbs",
   //  baseUrl: "http://localhost:3000",
});

export default auth;
