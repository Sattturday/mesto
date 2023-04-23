export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  remember({ name, about, avatar, cohort, _id }) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
    this._cohort = cohort;
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
  }
}
