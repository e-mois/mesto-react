function PopupWithForm(props){
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__container-form" name={`${props.name}`} noValidate>

          {props.children}
          
          <button type="submit" className="popup__button popup__button_type_save">{props.buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;