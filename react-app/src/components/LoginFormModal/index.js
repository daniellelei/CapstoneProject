import React, { useEffect, useState } from "react";
import { login, authenticate } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { createCartThunk } from "../../store/cart"
function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector((state)=>state.session.user);

  useEffect(()=>{
    dispatch(authenticate());
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      await dispatch(createCartThunk(user))
      closeModal()
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="errorUl">
          {errors.map((error, idx) => (
            <li key={idx} className="errors">{error}</li>
          ))}
        </ul>
        <label className="loginLabel">
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" className="loginButton">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
