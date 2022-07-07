import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCards()
    .then(res => {
      setCards(res)
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newArr = cards.filter(item => item._id !== card._id);
      setCards(newArr);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function closeAllPopups() {
    setAddPlacePopup(false);
    setAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCard({});
  }

  useEffect(() => {
    api.getUser()
    .then(res => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])

  function handleUpdateUser(data) {
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSavePlace={handleAddPlaceSubmit}/>
        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonName='Да'
        >
        </PopupWithForm>
        <ImagePopup
          name='image'
          card={selectedCard}
          onClose={closeAllPopups}
        />
        
        <script src="script/index.js" type="module"></script>
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
