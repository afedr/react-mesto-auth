import React, { useCallback, useEffect, useState } from "react";

import Header from "../Header/Header.js";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import { api, register } from "../../utils/Api.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";


function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((value) => {
        setCurrentUser(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
  }

  function openProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function openCardPopup() {
    setIsAddPlacePopupOpen(true);
  }

  function openAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === "Escape") closeAllPopups();
    },
    [closeAllPopups]
  );

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    handleEscClose,
    selectedCard,
  ]);

  function handleUpdateUser(data) {
    api
      .patchUserProfile(data)
      .then((value) => {
        setCurrentUser(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((value) => {
        setCurrentUser(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((intialCards) => {
        setCards(intialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleRegister(email, password) {
    register(email, password)
    .then((data) => {
      setIsInfoToolTipOpen(true)
      setIsRegisterSuccess(true)
      console.log("sucess");
    })
    .catch((err) => {
      setIsInfoToolTipOpen(true)
      setIsRegisterSuccess(false)
      console.log(err);
      console.log("error");
    });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page">
          <Header loggedIn={loggedIn} />

          <Switch>
            <ProtectedRoute 
              exact
              path="/"
              component={Main}
              onEditProfile={openProfilePopup}
              onAddPlace={openCardPopup}
              onEditAvatar={openAvatarPopup}
              onCardClick={(card) => setSelectedCard(card)}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} 
              loggedIn={loggedIn}
            />

            <Route path="/sign-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister}/>
            </Route>
            {/* <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route> */}
          </Switch>

          {loggedIn && <Footer />}

          {/* <Main
            onEditProfile={openProfilePopup}
            onAddPlace={openCardPopup}
            onEditAvatar={openAvatarPopup}
            onCardClick={(card) => setSelectedCard(card)}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
        </div>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen= {isInfoToolTipOpen}
          name="infoToolTip"
          isSuccess = {isRegisterSuccess}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
