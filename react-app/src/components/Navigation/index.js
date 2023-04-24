import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./assets/logo.jpg";
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='topNav'>
			<div className='leftNav'>
				<div>
					<NavLink exact to="/drinks">
						<img className ='logo' src={logo} alt='logo'/>
					</NavLink>
				</div>
				<div>
					<NavLink exact to="/drinks">
						<h2>Menu</h2>
					</NavLink>
				</div>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
			
		</div>
	);
}

export default Navigation;