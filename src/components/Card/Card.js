import {CurrentUserContext} from "../CurrentUserContext/CurrentUserContext";
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const card = props.card;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? '' : 'popup_is_hidden'}`
  ); 
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`; 


  function handleCardClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }


  return (
    <li className="elements__card">
      <img
        className="elements__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />

      <div className="elements__caption">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-group">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick } ></button>
          <span className="elements__like-number">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} ></button>
    </li>
  );
}

export default Card;
