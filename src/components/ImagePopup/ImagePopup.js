import { useState, useEffect } from "react";

function ImagePopup(props) {
  const [popupOpenImage, setPopupOpenImage] = useState('');

  useEffect(() => {
    if (props.card) {
      setPopupOpenImage("popup_is-active");
    } else {
      setPopupOpenImage("");
    }
  });

  const link = props.card ? props.card.link : "#";
  const title = props.card ? props.card.name : "";

  return (
    <div className={`popup popup_image ${popupOpenImage}`} id="popup-pic">
      <div className="popup__pic">
        <img className="popup__img" src={link} alt={title} />
        <h2 className="popup__title-img">{title}</h2>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
