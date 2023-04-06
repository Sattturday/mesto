export default class FormValidator {
  constructor(config, form) {
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._fieldSetSelector = config.fieldSetSelector;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _hideInputError = (inputElement) => {
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _showInputError = (inputElement) => {
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  };

  _findInputErrorElement = (inputElement) => {
    this._inputSectionElement = inputElement.closest(this._fieldSetSelector);
    this._errorElement = this._inputSectionElement.querySelector(
      `.${inputElement.id}-error`
    );
    return this._errorElement;
  };

  _toggleInputState = (inputElement) => {
    this._isValid = inputElement.validity.valid;
    this._errorElement = this._findInputErrorElement(inputElement);

    if (this._isValid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _hideErrorForInput = (inputElement) => {
    this._errorElement = this._findInputErrorElement(inputElement);
    this._hideInputError(inputElement);
  };

  _enableButton = () => {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  _disableButton = () => {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState = () => {
    this._formIsValid = this._inputs.every(
      (inputElement) => inputElement.validity.valid
    );

    if (this._formIsValid) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  _setEventListeners = () => {
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation = () => {
    this._inputs.forEach((inputElement) => {
      this._hideErrorForInput(inputElement);
    });
    this._toggleButtonState();
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
