import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
    >
      <div className="popup__field">
        <input
          type="text"
          name="username"
          id="userName"
          className="popup__input popup__input_type_name"
          placeholder="ФИО"
          required
          minLength="2"
          maxLength="40"
          value={name||''}
          onChange={handleChangeName}
        />
        <span className="popup__error" id="userName-error"></span>
      </div>

      <div className="popup__field">
        <input
          type="text"
          name="userabout"
          id="userAbout"
          className="popup__input popup__input_type_about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description||''}
          onChange={handleChangeDescription}
        />
        <span className="popup__error" id="userAbout-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
