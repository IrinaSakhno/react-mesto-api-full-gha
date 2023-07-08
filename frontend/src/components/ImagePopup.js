import React from "react";

function ImagePopup({ onClose, name, card }) {
  return (
    <div
      className={
        card.isOpen
          ? `popup popup_darker-background popup_opened`
          : `popup popup_darker-background`
      }
      id={`popup__${name}`}
      onKeyDown={() => console.log("Pressed")}
    >
      <div className="popup__overlay" onMouseDown={onClose}></div>
      <div className="popup__picture-view">
        <button
          className="popup__close-button popup__close-button_image close link"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__picture-with-caption">
          <img
            className="popup__picture"
            src={card.element.link}
            alt={card.element.name}
          />
          <figcaption className="popup__picture-caption">
            {card.element.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
