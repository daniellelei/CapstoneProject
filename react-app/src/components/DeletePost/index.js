import React, { useState, useEffect } from "react";
import * as postActions from "../../store/post";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function DeletePostModal({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const ClickYes = async (e) => {
    e.preventDefault();
    await dispatch(postActions.deletePost(post));
    await closeModal();
    // await dispatch(postActions.getUserPostThunk());
    return history.push(`/posts`);
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
          Yes Delete !
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

export default DeletePostModal;
