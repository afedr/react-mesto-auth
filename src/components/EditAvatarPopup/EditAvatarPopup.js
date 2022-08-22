import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="url"
          id="link-inputs"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
        />
        <span className="popup__error" id="link-inputs-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
