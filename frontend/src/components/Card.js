import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like link ${
    isLiked && "elements__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image link"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="elements__trash link"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__card">
        <h2 className="elements__card-name">{card.name}</h2>
        <div className="elements__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          ></button>
          <p className="elements__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
