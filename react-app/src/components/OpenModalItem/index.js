import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalItem({
  modalComponent, // component to render inside the modal
  itemType, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  if (itemType === 'icon') {
    return (
      <i 
      style={{ cursor: "pointer" }}
      onClick={onClick} 
      className="fa-solid fa-plus fa-lg"></i>
    )
  }
}

export default OpenModalItem;