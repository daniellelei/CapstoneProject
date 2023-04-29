import React from 'react';
import { useModal } from '../../context/Modal';
import * as cartActions from '../../store/cart'
import { useDispatch } from 'react-redux';
function AddToCartButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  user,
  drink
}) {
    const { setModalContent, setOnModalClose } = useModal();
    const dispatch = useDispatch();
   
    const onClick = async (e) => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
        if(!user){
            window.alert('You must be logged in to order a drink.')
        } else {
            await dispatch(cartActions.addToCartThunk(drink))
        }
    };

    return (
        <button onClick={onClick}>{buttonText}</button>
    );
}

export default AddToCartButton;