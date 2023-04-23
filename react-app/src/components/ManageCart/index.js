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
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
    }, [dispatch])

    if(!cart.id) return <div>Loading</div>
    let cart_custs = cart.customizations
    let drinksInCart = cart.drinksInCart

    const calculateTotalPrice = (allDrinks) => {
        let res = 0;
        if(!allDrinks[0].length && !allDrinks[1].length) return res.toFixed(2);
        if(!allDrinks[0].length && allDrinks[1].length !==0) {
            drinksInCart.forEach((d)=>{
                res += d.pirce
            })
            return res.toFixed(2)
        }
        if(allDrinks[0].length !== 0 && !allDrinks[1].length) {
            allDrinks[0].forEach((c)=>{
                res += c.drinks_customization.price
            })
            return res.toFixed(2)
        }
    
        allDrinks[0].forEach((c)=>{
            // console.log('cust price', c.drinks_customization.price)
            res += Number(c.drinks_customization.price)
            // console.log('res cust price', res)
        })
       allDrinks[1].forEach((d)=>{
            res = res + d.price 
        })
        return res.toFixed(2);
    }

    let total = calculateTotalPrice([cart_custs, drinksInCart])
    
    return (
        <div className="myCart">
            {!cart_custs.length ? <h1>Wanna add a drink to your cart?</h1> : null}
            {drinksInCart.map((d)=> (
                <div>
                    <p>Drink name: {d.name}</p>
                    <p>Price: {d.price}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={d}/>} />
                </div>
            ))}
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
            <p>Total Price: ${total}</p>
            <button
            onClick={ async (e)=> {
                e.preventDefault();
            }}
            
            >Let's order</button>
        </div>
    )

    
}

export default CurrentCart;