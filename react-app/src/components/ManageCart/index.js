import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageCart.css'
import * as cartActions from "../../store/cart"
// import OpenModalicon from "../OpenModalicon";
import RemoveFromCartModal from "../EditCart";
import OpenModalButton from '../OpenModalButton';

// import DeleteCustomization from "../DeleteCustomization";
const calculateTotalPrice = (allDrinks) => {
        let res = 0;
        // const sum = arr => arr.reduce((a, b)=> a+b, 0);
        // console.log('allDrinks[0]', allDrinks[0])
        // console.log('allDrinks[1]', allDrinks[1])
        if(!allDrinks[0].length && !allDrinks[1].length) return res.toFixed(2);
        if(!allDrinks[0].length && allDrinks[1].length !==0) {
            // res = sum(allDrinks[1])
            for (let i = 0; i < allDrinks[1].length; i++){
                res = res + allDrinks[1][i].price
            }
            return res.toFixed(2)
        }
        if(allDrinks[0].length !== 0 && !allDrinks[1].length) {
            allDrinks[0].forEach((c)=>{
                res = res + c.drinks_customization.price
            })
            return res.toFixed(2)
        }
    
        allDrinks[0].forEach((c)=>{
            // console.log('cust price', c.drinks_customization.price)
            res = res + Number(c.drinks_customization.price)
            // console.log('res cust price', res)
        })
       allDrinks[1].forEach((d)=>{
            res = res + d.price 
        })
        return res.toFixed(2);
    }

function CurrentCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.carts.currentCart);
    const user = useSelector((state) => state.session.user)
    const user_funds = user.funds

    const [hasEnoughFund, setHasEnoughFund] = useState(true);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
        return dispatch(cartActions.actionClearCart())
    }, [dispatch])

    let cart_custs = cart.customizations
    let drinksInCart = cart.drinksInCart
    let total = calculateTotalPrice([cart_custs, drinksInCart])
    useEffect(() => {
        const err = {};
        if(total > user_funds) err.funds = "Please add more to your funds."
        setErrors(err)
    }, [total, user_funds])
    
    const handleCheckOut = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(!Boolean(Object.values(errors).length)){
            const checkedOutRes = dispatch()
        } 


    }
    if(!cart.id) return <div>Loading</div>
    return (
        <div className="myCart">
            {!cart_custs.length && !drinksInCart.length ? <h1>Wanna add a drink to your cart?</h1> : 
            <h1>Order Summary</h1>
            }
            {drinksInCart.map((d)=> (
                <div key={d}>
                    <p>Drink name: {d.name}</p>
                    <p>Price: {d.price}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={d}/>} />
                </div>
            ))}
            {cart_custs.map((c) => (
                <div className="eaCustInCart" key={c}>
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
            onClick={handleCheckOut}
            
            >Let's order</button>
        </div>
    )

    
}

export default CurrentCart;