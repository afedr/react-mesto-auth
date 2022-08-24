import "./main.css";
import Card from "../Card/Card";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import React from "react";
import { Link, withRouter } from "react-router-dom";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-icon"
            alt="Аватар"
            src={currentUser.avatar}
          />

          <button
            type="button"
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="Редактирование"
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>

          <h2 className="profile__about">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default withRouter(Main);
