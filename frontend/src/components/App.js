import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Authorization:
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipSuccessful, setIsInfoTooltipSuccessful] = React.useState({
    isOpen: false,
    isSuccessful: false,
  });
  const navigate = useNavigate();

  // Data for popups logic:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });

  // User:
  const [currentUser, setCurrentUser] = React.useState({});

  // Cards:
  const [cards, setCards] = React.useState([]);

  // Getting user profile information and initial cards:
  React.useEffect(() => {
    api.getProfile().then(setCurrentUser).catch(console.error);

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error);
  }, []);

  // Changing/updating data functions:

  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleAddPlace = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Popups opening ang closing functions:
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, element: card });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmationPopupOpen(false);
    setSelectedCard({ isOpen: false, element: {} });
    setIsInfoTooltipSuccessful({
      isOpen: false,
      isSuccessful: false,
    });
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.isOpen;

  // Popup closing by Escape:
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  // Registration:
  const handleRegistration = ({ email, password }) => {
    auth
      .registerNewUser({ email: email, password: password })
      .then((res) => {
        setIsInfoTooltipSuccessful({
          isOpen: true,
          isSuccessful: true,
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipSuccessful({
          isOpen: true,
          isSuccessful: false,
        });
      });
  };

  // Authorization:
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch(console.error);
    }
  }, [navigate]);

  function handleLogin({ email, password }) {
    auth
      .authorizeExistingUser({ email: email, password: password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccessful({
          isOpen: true,
          isSuccessful: false,
        });
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  email={email}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} />}
          />

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          onClose={closeAllPopups}
          isSuccessful={isInfoTooltipSuccessful.isSuccessful}
          isOpen={isInfoTooltipSuccessful.isOpen}
        />

        <PopupWithForm
          title={"Вы уверены?"}
          name={"delete-card"}
          buttonText={"Да"}
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          onClose={closeAllPopups}
          name="opened-picture"
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
