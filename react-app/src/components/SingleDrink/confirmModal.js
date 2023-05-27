import React, { useState, useEffect } from "react";
import * as drinkActions from '../../store/drink';
import * as cartActions from '../../store/cart';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function ConfirmModal({page}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  
  const ClickContinue = (e) => {
    e.preventDefault();
    closeModal();
    history.push(page);
  };
  const ClickGoToCart = (e) => {
    e.preventDefault();
    closeModal();
    history.push('/cart')
  }

  return (
    <div className="container">
      <h3 className="title_text"> 🎉 Successfully Added to Order!</h3>
      <button onClick={ClickContinue}
      >Continue</button>
      <button onClick={ClickGoToCart}
      >Go to Cart</button>
    </div>
  );
}

export default ConfirmModal;
