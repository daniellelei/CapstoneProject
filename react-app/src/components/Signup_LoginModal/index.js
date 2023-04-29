import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function SignUpLoginModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  return (
    <div>
        <h3>Please Log in / Sign up to order</h3>
        <OpenModalButton
              buttonText="Log In"
              onItemClick={closeModal}
              modalComponent={<LoginFormModal />}
            />

        <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeModal}
            modalComponent={<SignupFormModal />}
        />
    </div>
  )
    
  
  }
export default SignUpLoginModal;
