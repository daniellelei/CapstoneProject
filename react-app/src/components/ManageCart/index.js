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
            await dispatch(cartActions.createCartThunk());
            await dispatch(sessionActions.authenticate());
            history.push('/aftercheckout')
            // if(!checkedOutRes.errors) {
            //     history.pushState(`/drinks`);
            //     setHasSubmitted(false);
            //     setErrors({});
            // }
        } 
    }
    if(!cart?.id || !user?.id) return (
        <div className="myCart">
            <h2>Please Log in and start adding drinks to your cart</h2>    
        </div>
    )
    console.log("cart_custssssss", cart_custs)
    console.log("cart_drinkssssss", cart_drinks)
    if (cart_custs === undefined && cart_drinks === undefined ) return (
        <div className="myCart">
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
        </div>
    )

    if (cart_custs.length === 0 && cart_drinks.length === 0 ) return (
        <div className="myCart">
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
        </div>
    )

    return (
        <div className="myCart">
            
            <h1>Order Summary</h1>
            {cart_drinks?.map((d)=> (
                <div key={cart_drinks.indexOf(d)} className="eaItem">
                    <div className="custcartDiv">
                        <h4>{d.name}</h4>
                        <p className="cartP">${d.price}</p>
                    </div>
                    <div className="deletButton">
                        <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<RemoveFromCartModal customization={d}/>} />
                    </div>
                </div>
            ))}
            {cart_custs?.map((c) => (
                <div className="eaCustInCart" key={cart_custs.indexOf(c)}>
                    <div className="custcartDiv">
                        <h4>{c.drinks_customization.name}</h4>
                        <div className="custDetail">
                            <p className="cartP">Size: {c.size}</p>
                            <p className="cartP">Shots: {c.shotOptions} {c.shotOptions < 2 ? "shot" : "shots"}</p>
                            <p className="cartP">Expresso: {c.expressoRoastOptions}</p>
                            <p className="cartP">Milk: {c.milk}</p>
                            <p className="cartP">${c.drinks_customization.price}</p>
                        </div>
                    </div>
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<RemoveFromCartModal customization={c}/>} />
                </div>
            ))}
            <div className="priceSumDiv">
                <p className="priceSummary">Subtotal: ${total}</p>
                <p className="priceSummary">Tax(10.5%): ${(total*0.105).toFixed(2)}</p>
                <p className="priceSummary">Total: ${(total*1.105).toFixed(2)}</p>
                <button
                onClick={handleCheckOut}
                >Let's order</button>
                {hasSubmitted && Boolean(Object.values(errors).length) ? (
                    <p>{errors.funds}</p> ) : null}
            </div>
        </div>
    )

    
}

export default CurrentCart;