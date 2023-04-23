import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as cartActions from "../../store/cart"
// import OpenModalicon from "../OpenModalicon";
// import EditCustomization from "../EditCustomization";
// import OpenModalButton from '../OpenModalButton';
// import DeleteCustomization from "../DeleteCustomization";

function CurrentCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.carts.currentCart);
    // const cartCusts = useSelector((state)=>state.carts.cartCusts);

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
    }, [dispatch])
    if(!cart) return <div>Loading</div>

    return (
        <div>
            {cart.customizations.map((c) => (
                <div>
                    <p>{c.drink_id}</p>
                    <p>{c.expressoRoastOptions}</p>
                    <p>{c.milk}</p>
                    <p>{c.size}</p>
                </div>
            ))}
        </div>
    )

    
}

export default CurrentCart;