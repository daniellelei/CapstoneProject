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
    // const cartCusts = useSelector((state)=>state.carts.cartCusts);

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
    }, [dispatch])

    if(!cart.id) return <div>Loading</div>

    return (
        <div className="myCart">
            {cart.customizations.map((c) => (
                <div className="eaCustInCart">
                    <p>{c.drink_id}</p>
                    <p>{c.expressoRoastOptions}</p>
                    <p>{c.milk}</p>
                    <p>{c.size}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={c}/>} />
                </div>
            ))}
        </div>
    )

    
}

export default CurrentCart;