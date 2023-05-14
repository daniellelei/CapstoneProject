import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./assets/marioCoffee.jpg";
import * as cartActions from "../../store/cart"
import * as sessionActions from "../../store/session"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const dispatch = useDispatch();
	const user = useSelector((state)=> state.session.user);
	const cart = useSelector((state) => state.carts.currentCart)
	// let drinkCount = cart.drinks?.length+cart.customizations?.length
	const drinksCount = (cart) => {
		let drinks = 0
		if(cart?.drinks?.length > 0) drinks = cart.drinks.length;
		let custs = 0
		if(cart?.customizations?.length > 0) custs = cart.customizations.length
		return (drinks+custs)
	}
	
	useEffect(()=> {
		if(user) dispatch(cartActions.getCurrentCartThunk());
		
		if(!cart) setItemCount(0)
		else setItemCount(drinksCount(cart))
	}, [dispatch, user])
	
	const cartClick = (e) =>{
		e.preventDefault();
		history.push('/cart')
	}
	const signInClick = (e) => {
		e.preventDefault();

	}
	const [itemCount, setItemCount] = useState(drinksCount(cart));
	console.log('from top nav cart', itemCount)
	if(!cart) return null;
	return (
		<div className='topNav'>
			<div className='leftNav'>
			
				<NavLink exact to="/">
					{/* <img className ='logo' src={logo} alt='logo'/> */}
					<img className='logo' src={logo} alt='logo' />
				</NavLink>
				<NavLink className='leftNavItem' exact to="/drinks">
					<h2 className='leftNavItem'>Menu</h2>
				</NavLink>
				<NavLink className='leftNavItem' exact to="/posts">
					<h2 className='leftNavItem'>Feed</h2>
				</NavLink>
				
			</div>
			<div className='rightNav'>
				<div>
					Find a Store
				</div>
				<div>
					<OpenModalButton
					type = 'signIn'
					buttonText="Sign in"
					modalComponent={<LoginFormModal />}
					/>
					
				</div>
				<div>
					<OpenModalButton
					type = 'joinNow'
					buttonText="Join now"
					modalComponent={<SignupFormModal />}
            		/>
				</div>
			</div>
			{/* <div className='rightNav'>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<button onClick={cartClick} className='navButton'>
					<i className="fas fa-cart-shopping" />
					
					
					<p className='count'>
						{cart?drinksCount(cart):0}
					</p> 
				</button>
			</div> */}
		</div>
	);
}

export default Navigation;