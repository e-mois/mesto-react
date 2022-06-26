import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
  
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function closeAllPopup() {
    setAddPlacePopup(false);
    setAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
      />
      <Footer/>
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        buttonName='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      >
        <label htmlFor="input-name" className="popup__label">
          <input type="text" id="input-name" className="popup__input popup__input_type_name" value="" required minLength="2" maxLength="40" name="name" placeholder="Имя"/>
          <span className="input-name-error popup__input-error"></span>
        </label>
        <label htmlFor="input-about" className="popup__label">
          <input type="text" id="input-about" className="popup__input popup__input_type_about" value="" required minLength="2" maxLength="200" name="about" placeholder="Занятие" />
          <span className="input-about-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        buttonName='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
      >
        <label htmlFor="input-avatar" className="popup__label">
          <input type="url" id="input-avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на картинку" required name="link" />
          <span className="input-avatar-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name='add-place'
        title='Новое место'
        buttonName='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
      >
        <label htmlFor="input-place-name" className="popup__label">
          <input type="text" id="input-place-name" className="popup__input popup__input_type_place-name" placeholder="Название" required minLength="2" maxLength="30" name="name" />
          <span className="input-place-name-error popup__input-error"></span>
        </label>
        <label htmlFor="input-place-link" className="popup__label">
          <input type="url" id="input-place-link" className="popup__input popup__input_type_place-link" placeholder="Ссылка на картинку" required name="link" />
          <span className="input-place-link-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        buttonName='Да'
      >
      </PopupWithForm>
      <ImagePopup
        name='image'
        card={selectedCard}
        onClose={closeAllPopup}
      />
      
      <script src="script/index.js" type="module"></script>
      
    </div>
  );
}

export default App;
