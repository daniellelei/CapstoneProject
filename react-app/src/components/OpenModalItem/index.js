import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalItem({
  modalComponent, // component to render inside the modal
  itemType, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  item, 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  if (itemType === "drink"){
      return (
        <li onClick={onClick}>
            {item}
        </li>
      );
  }
}

export default OpenModalItem;