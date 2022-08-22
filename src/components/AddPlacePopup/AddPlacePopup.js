import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          id="name-input"
          name="title"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          ref={nameRef}
        />
        <span className="popup__error" id="name-input-error"></span>
      </div>

      <div className="popup__field">
        <input
          type="url"
          id="link-input"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required
          ref={linkRef}
        />
        <span className="popup__error" id="link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
