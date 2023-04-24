import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import './ManageCart.css'
import * as cartActions from "../../store/cart"
import * as sessionActions from "../../store/session"
// import OpenModalicon from "../OpenModalicon";
import RemoveFromCartModal from "../EditCart";
import OpenModalButton from '../OpenModalButton';

// import DeleteCustomization from "../DeleteCustomization";
const calculateTotalPrice = (allDrinks) => {
        let res = 0;
        // const sum = arr => arr.reduce((a, b)=> a+b, 0);
        console.log('allDrinks[0]', allDrinks[0])
        console.log('allDrinks[1]', allDrinks[1])
        if(allDrinks[0] === undefined && allDrinks[1]=== undefined) return 0
        if(!allDrinks[0].length && !allDrinks[1].length) return 0;
        if(!allDrinks[0].length && allDrinks[1].length !==0) {
            // res = sum(allDrinks[1])
            for (let i = 0; i < allDrinks[1].length; i++){
                res = res + allDrinks[1][i].price
            }
            return res.toFixed(2)
        }
        if(allDrinks[0].length !== 0 && !allDrinks[1]?.length) {
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
    const history = useHistory();
    const cart = useSelector((state)=>state.carts.currentCart);
    const user = useSelector((state) => state.session.user)
    const user_funds = user?.funds
    let cart_custs = cart.customizations
    let cart_drinks = cart.drinks
    console.log('cart_drinks', cart_drinks)
    let total = calculateTotalPrice ([cart_custs, cart_drinks])
    const [hasEnoughFund, setHasEnoughFund] = useState(true);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const [total, setTotal] = useState(calculateTotalPrice([cart_custs, drinksInCart]))

    useEffect(() => {
        dispatch(cartActions.getCurrentCartThunk());
        return () => dispatch(cartActions.actionClearCart())
    }, [dispatch])

    // let total = calculateTotalPrice([cart_custs, cart_drinks])
    useEffect(() => {
        const err = {};
        
        if(total > user_funds) err.funds = "Please add more to your funds."
        setErrors(err)
    }, [total, user_funds])
    
    const handleCheckOut = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        // setTotal(calculateTotalPrice([cart_custs, cart_drinks]))
        // console.log('inside handleCheckOut', total)

        if(!Boolean(Object.values(errors).length)){
            const checkedOutRes = await dispatch(cartActions.checkOutThunk(total));
            await dispatch(sessionActions.authenticate());
            history.push('/drinks')
            // if(!checkedOutRes.errors) {
            //     history.pushState(`/drinks`);
            //     setHasSubmitted(false);
            //     setErrors({});
            // }
        } 
    }
    if(!cart.id) return <div>Loading</div>
    console.log("cart_custssssss", cart_custs)
    console.log("cart_drinkssssss", cart_drinks)
    if (cart_custs === undefined && cart_drinks === undefined ) return (
        <div>
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
        </div>
    )

    if (cart_custs.length === 0 && cart_drinks.length === 0 ) return (
        <div>
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
        </div>
    )

    return (
        <div className="myCart">
            
            <h1>Order Summary</h1>
            {cart_drinks?.map((d)=> (
                <div key={cart_drinks.indexOf(d)}>
                    <p>Drink name: {d.name}</p>
                    <p>{d.id}</p>
                    <p>Price: {d.price}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={d}/>} />
                </div>
            ))}
            {cart_custs?.map((c) => (
                <div className="eaCustInCart" key={cart_custs.indexOf(c)}>
                    <p>Drink name: {c.drinks_customization.name}</p>
                    <p>{c.id}</p>
                    <p>Price: {c.drinks_customization.price}</p>
                    <p>{c.expressoRoastOptions}</p>
                    <p>{c.milk}</p>
                    <p>{c.size}</p>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={c}/>} />
                </div>
            ))}
            <p>Tax(10.5%): ${(total*0.105).toFixed(2)}</p>
            <p>Subtotal: ${total}</p>
            <p>Total: ${(total*1.105).toFixed(2)}</p>
            <button
            onClick={handleCheckOut}
            >Let's order</button>
            {hasSubmitted && Boolean(Object.values(errors).length) ? (
                <p>{errors.funds}</p> ) : null}
        </div>
    )

    
}

export default CurrentCart;