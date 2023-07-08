import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  email,
  onLogout
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <p className="header__menu-option header__email">{email}<button href="#" className="header__menu-option link header__button" onClick={onLogout}>
          Выйти
        </button></p>
        
      </Header>

      <main className="main">
        <section className="profile">
          <div className="profile__about">
            <div className="profile__avatar-block">
              <img
                src={currentUser.avatar}
                alt="Аватар"
                className="profile__avatar"
              />
              <button
                className="profile__avatar-edit-button"
                type="button"
                onClick={onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__description">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__occupation">{currentUser.about}</p>
              </div>
              <button
                className="profile__edit-button link"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
          </div>
          <button
            className="profile__add-button link"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          <ul className="elements__gallery">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Main;
