import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"change-name"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-field popup__form-field-name"
        name="name"
        id="name-input"
        type="text"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
        value={name ?? ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__form-field popup__form-field-occupation"
        name="occupation"
        id="occupation-input"
        type="text"
        placeholder="Введите свой тип занятости"
        minLength="2"
        maxLength="200"
        required
        value={description ?? ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error occupation-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
