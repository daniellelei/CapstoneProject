import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from "../../store/cart"
import * as sessionActions from "../../store/session"
import './Footer.css'

function Footer({isLoaded}) {
    const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
    const dispatch = useDispatch();
	const user = useSelector((state)=> state.session.user);
	const cart = useSelector((state) => state.carts.currentCart);
    
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
    const [itemCount, setItemCount] = useState(drinksCount(cart));
    if(!cart) return null;
    return (
        <div className='footer'>
        <div style={{
            display:"flex", 
            columnGap: "20px",
            justifyContent:"center", 
            alignItems:"center", 
            margin:"0 20px 0 20px",
            width:"50%"}}
        >
            <p style={{color:"white", fontSize:"12px"}}
            >Star Power Coffee Provided to you by Danielle Lei. Contact Me: </p>
            <a href='mailto:danielle.lei2014@gmail.com'>
                <i class="fa-solid fa-envelope fa-lg"></i>
            </a>
            <a href='https://github.com/daniellelei/CapstoneProject.git'>
                <i class="fa-brands fa-square-github fa-lg"></i>
            </a>
            <a href='https://www.linkedin.com/in/danielle-lei/'>
                <i class="fa-brands fa-linkedin fa-lg"></i>
            </a>
            <a href='https://wellfound.com/u/danielle-lei'>
                <i class="fa-brands fa-angellist fa-lg"></i>
            </a>
        </div>
        <button onClick={cartClick} className='shoppingbag'>
            <i className="fa-solid fa-bag-shopping fa-lg"></i>
            <p className='count'>
                {cart?drinksCount(cart):0}
            </p> 
        </button>
        </div>
    )
}

export default Footer