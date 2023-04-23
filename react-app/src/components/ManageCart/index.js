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

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
    }, [dispatch])
    if(!cart) return <div>Loading</div>

    return (
        <div>
            <h2>{cart.id}</h2>
        </div>
    )

    
}

export default CurrentCart;