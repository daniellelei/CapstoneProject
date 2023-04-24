import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./assets/logo.jpg";
function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const cartClick = (e) =>{
    e.preventDefault();
	history.push('/cart')
  }

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
			<div className='rightNav'>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<button onClick={cartClick} className='navButton'>
					<i className="fas fa-cart-shopping" />
					{/* <i class="fa-light fa-cart-shopping"></i> */}
				</button>
			</div>
		</div>
	);
}

export default Navigation;