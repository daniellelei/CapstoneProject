import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, authenticate } from "../../store/session";
import "./SignupForm.css";
import { createCartThunk } from "../../store/cart"
function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [funds, setFunds] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const user = useSelector((state)=>state.session.user);

	useEffect(()=>{
    dispatch(authenticate());
  },[dispatch])


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, funds));
			if (data) {
				setErrors(data);
			} else {
				await dispatch(createCartThunk(user))
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="login">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="errorUl">
					{errors.map((error, idx) => (
						<li key={idx} className="errors">{error}</li>
					))}
				</ul>
				<label>
					Email
				</label>
					<input
						className="loginInput"
						type="text"
						value={email}
						placeholder="Please provide an email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				<label>
					Username
				</label>
					<input
						className="loginInput"
						type="text"
						value={username}
						placeholder="Please provide a username"
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				<label>
					Funds
				</label>
					<input
						className="loginInput"
						type="text"
						value={funds}
						placeholder="Please add at least $1"
						onChange={(e) => setFunds(e.target.value)}
						required
					/>
				<label>
					Password
				</label>
					<input
						className="loginInput"
						type="password"
						value={password}
						placeholder="Please provide a password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				<label>
					Confirm Password
				</label>
					<input
						className="loginInput"
						type="password"
						value={confirmPassword}
						placeholder="Please confirm your password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				<button type="submit" className="loginButton">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;