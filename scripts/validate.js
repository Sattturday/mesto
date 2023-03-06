const hiddenInputError = (inputElement, errorElement, options) => {
  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
  inputElement.classList.remove(options.inputErrorClass);
};

const showInputError = (inputElement, errorElement, options) => {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(options.errorClass);
  inputElement.classList.add(options.inputErrorClass);
};

const findInputErrorElement = (inputElement, options) => {
  const { fieldSetSelector } = options;
  const inputSectionElement = inputElement.closest(fieldSetSelector);
  const errorElement = inputSectionElement.querySelector(
    `.${inputElement.id}-error`
  );
  return errorElement;
};

const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
  const errorElement = findInputErrorElement(inputElement, options);

  if (isValid) {
    hiddenInputError(inputElement, errorElement, options);
  } else {
    showInputError(inputElement, errorElement, options);
  }
};

const toggleErrorForInput = (inputElement, options) => {
  const errorElement = findInputErrorElement(inputElement, options);
  hiddenInputError(inputElement, errorElement, options);
};

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove(inactiveButtonClass);
};

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(inactiveButtonClass);
};

const toggleButtonState = (inputs, submitButton, inactiveButtonClass) => {
  const formIsValid = inputs.every(
    (inputElement) => inputElement.validity.valid
  );

  if (formIsValid) {
    enableButton(submitButton, inactiveButtonClass);
  } else {
    disableButton(submitButton, inactiveButtonClass);
  }
};

const setEventListeners = (form, options) => {
  const submitButton = form.querySelector(options.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleInputState(inputElement, options);
      toggleButtonState(inputs, submitButton, options.inactiveButtonClass);
    });
  });
};

const resetValidation = (form, options) => {
  const submitButton = form.querySelector(options.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));

  inputs.forEach((inputElement) => {
    toggleErrorForInput(inputElement, options);
  });
  toggleButtonState(inputs, submitButton, options.inactiveButtonClass);
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};
