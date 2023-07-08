import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg"

function InfoTooltip ({onClose, isOpen, isSuccessful}) {
  return (
    <div
      className={isOpen ? `popup popup_opened` : `popup`}
      id='popup__registration-result'
    >
      <div className="popup__overlay" onMouseDown={onClose}></div>
      <div className="popup__container info__container">
        <button
          className="popup__close-button link"
          type="button"
          onClick={onClose}
        ></button>
        {isSuccessful ? (
            <>
                <img src={success} alt="Успех" className="info__image" />
                <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
            </>
        ) : (
            <>
                <img src={fail} alt="Ошибка" className="info__image" />
                <h2 className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
            </>
        )}
        
      </div>
    </div>
  );
}

export default InfoTooltip;
