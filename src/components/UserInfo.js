export default class UserInfo {
  constructor(userNameSelector, userJobSelector, avatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._avatarImage = document.querySelector(avatarSelector);
  }

  remember({ name, about, avatar, _id }) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
    this.id = _id;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
  }

  setUserInfo() {
    this._userName.textContent = this._name;
    this._userJob.textContent = this._job;
    this._avatarImage.src = this._avatar;
  }
}
