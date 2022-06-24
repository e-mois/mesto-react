import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

  const [userName, setUserName] = React.useState(''); 
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, getListCards] = React.useState([]);

  React.useEffect(() => {
    api.getUser()
    .then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, [userName, userDescription, userAvatar])

  React.useEffect(() => {
    api.getCards()
    .then(res => {
      //console.log(res);
      getListCards(res);
    })
  })

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <a href="#" className="profile__avatar-link" onClick={props.onEditAvatar}>
            <img src={`${userAvatar}`} alt="Аватар" className="profile__avatar"/>
          </a>
          <div className="profile__person">
            <div className="profile__edit-block">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit" aria-label="Изменить" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={props.onAddPlace}></button>
    
      </section>
      <section className="elements" aria-label="Галерея">
        <ul className="elements-list">
          {cards.map((card) => <Card key={card._id} elem={card} onCardClick={props.onCardClick} />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;