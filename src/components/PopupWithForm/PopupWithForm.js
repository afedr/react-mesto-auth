
function PopupWithForm(props) {
  const openForm = props.isOpen && "popup_is-active";
  const closeAllPopups = props.onClose;


  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) closeAllPopups();
  };

  return (
    <div
      className={`popup popup_${props.name} ${openForm}`}
      id={props.name}
      onClick={handleOverlayClick}
    >
      <div className="popup__content" id={props.name}>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button
            type="submit"
            className="popup__button"
            onClick={closeAllPopups}
          >
            Сохранить
          </button>
          <button
            type="button"
            className="popup__close"
            onClick={closeAllPopups}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
