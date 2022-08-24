import React from "react";
import Success from "../../images/Success.png";
import Fail from "../../images/Fail.png";
import closeicon from "../../images/closeIcon.svg";

function InfoToolTip(props) {
  const openForm = props.isOpen && "popup_is-active";
  const closeAllPopups = props.onClose;

  return (
    <div className={`popup popup_${props.name} ${openForm}`}>
      <div className="popup__content">
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.isSuccess ? (
            <>
              <img
                src={`${Success}`}
                alt="Регистрация прошла успешно."
                className="popup__tooltip_image"
              />
              <p className="popup__tooltip_message">
                Вы успешно зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img
                src={`${Fail}`}
                alt="Регистрация не была выполнена."
                className="popup__tooltip_image"
              />
              <p className="popup__tooltip_message">
                Что-то пошло не так. Попробуйте ещё раз!
              </p>
            </>
          )}
        </form>
        <button type="button" className="popup__close" onClick={closeAllPopups}>
          <img src={closeicon} alt="кнопка закрытия попапа" />
        </button>
      </div>
    </div>
  );
}

export default InfoToolTip;
