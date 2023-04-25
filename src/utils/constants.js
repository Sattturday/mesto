// cards
export const templateSelector = '.card-template';
export const cardsSectionSelector = '.cards';

// popups
export const popupImageSelector = '.popup_for_full-image';
export const popupProfileSelector = '.popup_for_edit-profile';
export const popupEditAvatarSelector = '.popup_for_add-avatar';
export const popupAddCardSelector = '.popup_for_add-card';
export const popupConfirmationSelector = '.popup_for_confirmation';

// profile
export const profileNameSelector = '.profile__info-name';
export const profileJobSelector = '.profile__info-job';
export const avatarSelector = '.profile__avatar-image';

// buttons
export const profileEditButton = document.querySelector(
  '.profile__button_edit'
);
export const avatarEditButton = document.querySelector('.profile__avatar-edit');
export const cardAddButton = document.querySelector('.profile__button_add');

// validation
export const validationConfig = {
  formSelector: '.popup__container', // form
  fieldSetSelector: '.popup__items', // fieldset
  inputSelector: '.popup__input', // input
  submitButtonSelector: '.popup__button', // submit
  inactiveButtonClass: 'popup__button_disabled', // submit disabled
  inputErrorClass: 'popup__input_type_error', // red border-bottom
  errorClass: 'popup__error_visible', // show mistakes
};
