import React, { useState, useEffect } from "react";
import * as customizationActions from "../../store/customization";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function DeleteModal({ customization }) {
  console.log("from deleteModal", customization)
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const currentCart = useSelector((state)=>state.carts.currentCart);

  if (currentCart.customizations?.length>0){
      for (let c of currentCart.customizations){
        if (customization.id === c.id) {
          return (
            <div>
              <h2>This customization is currently in your cart. Please remove it from cart before deleting it. Thank you! 😃</h2>
            </div>
          )
        }
      }
    }

  const ClickYes = async (e) => {
    e.preventDefault();
    await dispatch(customizationActions.deleteCustomization(customization));
    await closeModal();
    await dispatch(customizationActions.getUserCustomizationThunk());
    return history.push(`/customizations`);
    // return history.push(`/user`);
  };

  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  
  return (
    <div className="container">
      <h1 className="title_text">Are you sure?</h1>
      <h4 className="confirmation-text">
        Once you delete a customization, you can't undo it!
      </h4>
      <div className="button-container">
        {/* <div className="submitDiv de"> */}
        <button onClick={ClickYes} className="confirmation-button">
          Yes Delete it!
        </button>
        {/* </div> */}
      </div>
      <div className="submitDiv de">
        <button onClick={ClickNo} className="cancel-button">
          No Keep it!
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
