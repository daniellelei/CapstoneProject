import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function ConfirmModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  
  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="container">
      <h3 className="title_text"> successfully Added to Order!</h3>

      <div className="submitDiv de">
        <button onClick={ClickNo} className="cancel-button">
          close
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
