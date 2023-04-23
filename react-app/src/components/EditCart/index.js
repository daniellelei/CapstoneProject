import React, { useState, useEffect } from "react";
import * as cartActions from "../../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function RemoveFromCartModal ({ customization }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const ClickYes = async (e) => {
    e.preventDefault();
    await dispatch(cartActions.removeFromCartThunk(customization));
    await closeModal();
    await dispatch(cartActions.getCurrentCartThunk());
    return history.push(`/cart`);
  };

  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="container">
      <h1 className="title_text">Are you sure?</h1>
      <div className="button-container">
        {/* <div className="submitDiv de"> */}
        <button onClick={ClickYes} className="confirmation-button">
          Yes 
        </button>
        {/* </div> */}
      </div>
      <div className="submitDiv de">
        <button onClick={ClickNo} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveFromCartModal;
