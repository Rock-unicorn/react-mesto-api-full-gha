import { apiConfig } from "./utils";

class Api {
  constructor(config) {
    this.url = config.baseUrl;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Ошибка'))
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse)
  }

  changeProfile(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse)
  }

  createNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse)
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse)
  }

  addLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse)
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse)
  }

  changeProfileAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._handleResponse)
  }
}

export const api = new Api(apiConfig);
