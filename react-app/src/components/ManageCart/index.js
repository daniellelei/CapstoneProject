import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageCart.css'
import * as cartActions from "../../store/cart"
// import OpenModalicon from "../OpenModalicon";
import RemoveFromCartModal from "../EditCart";
import OpenModalButton from '../OpenModalButton';

// import DeleteCustomization from "../DeleteCustomization";

function CurrentCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.carts.currentCart);
    

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
    }, [dispatch])

    if(!cart.id) return <div>Loading</div>
    let cart_custs = cart.customizations

    const calculateTotalPrice = (cart_custs) => {
        let res = 0;
        cart_custs.forEach((c)=>{
            res += c.drinks_customization.price
        })
        return res.toFixed(2);
    }
    
    return (
        <div className="myCart">
            {!cart_custs.length ? <h1>Wanna add a drink to your cart?</h1> : null}
            {cart_custs.map((c) => (
                <div className="eaCustInCart">
                    <p>Drink name: {c.drinks_customization.name}</p>
                    <p>Price: {c.drinks_customization.price}</p>
                    <p>{c.expressoRoastOptions}</p>
                    <p>{c.milk}</p>
                    <p>{c.size}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={c}/>} />
                </div>
            ))}
            <p>Total Price: ${calculateTotalPrice(cart_custs)}</p>
            <button
            
            >Let's order</button>
        </div>
    )

    
}

export default CurrentCart;