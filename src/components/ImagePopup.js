function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.card.name ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <p className="popup__description"></p>
      </div>    
    </div>
  )
}

export default ImagePopup;