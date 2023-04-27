import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./assets/logo.jpg";
import * as cartActions from "../../store/cart"
import * as sessionActions from "../../store/session"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.carts.currentCart)
	const user = useSelector((state)=> state.session.user);
	const [itemCount, setItemCount] = useState(0);
	

	// useEffect(()=> {
	// 	if(user) dispatch(cartActions.getCurrentCartThunk());
	// 	console.log('inside useEffect', cart)
	// 	if(!cart) setItemCount(0)
	// 	else drinksCount(cart)
	// }, [dispatch, user])

	// const drinksCount = (cart) => {
	// 	let drinks = 0
	// 	if(cart?.drinks?.length!==0) drinks = cart.drinks.length;
	// 	let custs = 0
	// 	if(cart?.customizations?.length !== 0) custs = cart.customizations.length
	// 	setItemCount(drinks+custs)
	// }


	const cartClick = (e) =>{
    e.preventDefault();
	history.push('/cart')
  }

	return (
		<div className='topNav'>
			<div className='leftNav'>
				<div>
					<NavLink exact to="/">
						{/* <img className ='logo' src={logo} alt='logo'/> */}
						<img className='logo' src="https://i.giphy.com/media/ZDNQdzCUjIK9VNUE2c/giphy.webp" alt='logo' />
					</NavLink>
				</div>
				<div>
					<NavLink exact to="/drinks">
						<h2>Menu</h2>
					</NavLink>
					<NavLink exact to="/posts">
						<h2>Feed</h2>
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
					{/* <p className='count'>
						{itemCount}
					</p> */}
					{/* <i class="fa-light fa-cart-shopping"></i> */}
				</button>
			</div>
		</div>
	);
}

export default Navigation;