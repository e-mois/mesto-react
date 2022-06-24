function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.elem);
  }

  return (
    <li className="element">
      <button type="submit" className="element__trashbin" aria-label="Удалить"></button>
      <div className="element__image-container">
        <a href="#" className="element__link">
          <img src={`${props.elem.link}`} alt={`${props.elem.name}`} className="element__image" onClick={handleClick} />
        </a>
      </div>
      <div className="element__info">
        <h2 className="element__title">{props.elem.name}</h2>
        <div className="element__like-container">
          <button type="submit" className="element__like" aria-label=""></button>
          <p className="element__like-count">{props.elem.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;