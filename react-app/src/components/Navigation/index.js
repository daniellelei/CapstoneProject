import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./assets/logo.png";
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
					<h2 className='leftNavItem'>Feeds</h2>
				</NavLink>
				<NavLink className='leftNavItem' exact to={`/customizations`}>
					<h2 className='leftNavItem'>My Favorites</h2>
				</NavLink>
				{/* {!user ? <div>{"     "}</div> : (<NavLink className='leftNavItem' exact to={`/customizations`}>
					<h2 className='leftNavItem'>My Favorites</h2>
				</NavLink>)} */}
				
			</div>
			<div className='rightNav'>
				{/* <div>
					Find a Store
				</div> */}
				{!user ? (
					<div style={{display:"flex"}}
					>
						<OpenModalButton
						type = 'signIn'
						buttonText="Sign in"
						modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
						type = 'joinNow'
						buttonText="Join now"
						modalComponent={<SignupFormModal />}
						/>
					</div>
				) : (
					<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
						{user.username === 'boss' ? (
							<div style={{display:"flex"}}>
								<button onClick={(e)=>{
									e.preventDefault();
								}}>
								<NavLink to={`/carts`} className="navLink">Sales Report</NavLink>
								</button>
								<button onClick={(e)=>{
									e.preventDefault();
								}}>
									<NavLink to={`/carts/unprocessed`} className="navLink">Current Orders</NavLink>
								</button>
								
							</div>
						): null}
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<div>
				{!user? (<button onClick={cartClick}
				style={{backgroundColor:"white", width:"20px"}}
				>
							<i style={{color:"#1a6241", marginRight:"5px"}}
							className="fa-solid fa-bag-shopping fa-lg" />
							<p style={{color:"#1a6241"}}
							className='count'>
								{cart?drinksCount(cart):0}
							</p> 
						</button>
						):( <div>
							<button onClick={cartClick} 
							style={{backgroundColor:"white", width:"20px"}}
							// className='navButton'
							>
								<i style={{color:"#1a6241" , marginRight:"5px"}}
								className="fa-solid fa-bag-shopping fa-lg" />
								<p style={{color:"#1a6241"}}
								className='count'>
									{cart?drinksCount(cart):0}
								</p> 
							</button>
						</div>
							
						)}
						
				</div>
				
				
			</div>
			
				
			
		</div>
	);
}

export default Navigation;