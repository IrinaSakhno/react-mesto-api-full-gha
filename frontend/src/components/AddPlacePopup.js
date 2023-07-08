import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(event) {
    const input = event.target.value;
    setName(input);
  }

  function handleChangeLink(event) {
    const input = event.target.value;
    setLink(input);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"new-card"}
      buttonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-field popup__form-field-card"
        name="card"
        id="placename-input"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error placename-input-error"></span>
      <input
        className="popup__form-field popup__form-field-source"
        name="source"
        id="placelink-input"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error placelink-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
