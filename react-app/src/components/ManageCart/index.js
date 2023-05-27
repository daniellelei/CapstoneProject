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
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { isAdded, numOfAdded } from "../SingleDrink";
import { useModal } from '../../context/Modal';
import ConfirmModal from '../SingleDrink/confirmModal';
import SignUpLoginModal from "../Signup_LoginModal";
import marioImg from './assets/waitingForOrder.JPG'
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
     const { setModalContent, setOnModalClose } = useModal();
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
        if(user) dispatch(cartActions.getCurrentCartThunk());
        return () => dispatch(cartActions.actionClearCart())
    }, [dispatch,user])

    // let total = calculateTotalPrice([cart_custs, cart_drinks])
    useEffect(() => {
        const err = {};
        
        if(total > user_funds) err.funds = "Please add more to your funds."
        setErrors(err)
    }, [total, user_funds])
    
    const handleCheckOut = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(!Boolean(Object.values(errors).length)){
            const checkedOutRes = await dispatch(cartActions.checkOutThunk(total));
            history.push('/aftercheckout')
            await dispatch(cartActions.createCartThunk());
            await dispatch(sessionActions.authenticate());
            
        } 
    }
    if(!cart?.id || !user?.id) return (
        <div className="myCart">
            <h2>Please Log in and start adding drinks to your cart 😃</h2> 
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />

        </div>
    )
   
    if (cart_custs === undefined && cart_drinks === undefined ) return (
        <div className="myCart" style={{marginTop:"10%"}}>
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
        </div>
    )

    if (cart_custs.length === 0 && cart_drinks.length === 0 ) return (
        <div className="myCart Empty" style={{marginTop:"10%", marginBottom:"10%"}}>
            <h1>Wanna add a drink to your cart?</h1>
            <h4>* Your cart is empty</h4>
            <img style={{width: '600px'}}
            alt= "img"
            src={marioImg}></img>
        </div>
    )

    const removeDuplicate = (items, type) => {
        let res = [];
        let resId = []
        for (let i of items){
            if (!resId.includes(i.id)) {
                resId.push(i.id)
                res.push(i)
            }
        }
        return res;
    }

    return (
        <div className="myCart">
            
            <h1>📝 Order Summary</h1>
            
            {removeDuplicate(cart_drinks).map((d)=>(
                <div key={cart_drinks.indexOf(d)} className="eaItem">
                    <img 
                        src = {d.imageUrl}
                        alt = "drinkImg"
                        style={{width:'80px', height:"80px", objectFit:"cover", borderRadius:"50%"}}
                        />
                    <div className="custcartDiv">
                        <h4>{d.name}</h4>
                        <p className="cartP">${d.price}</p>
                    </div>
                    {user && !isAdded(cart,"drink", d.id) ? <button
                    onClick = {async (e) => {
                        e.preventDefault();
                        if(user){
                            await dispatch(cartActions.addToCartThunk(d))
                        }
                        setModalContent(<ConfirmModal />);
                        }}
                    >Add</button>
                    : null} 
                    {!user ? <OpenModalButton 
                        buttonText= "Add to Cart"
                        modalComponent={<SignUpLoginModal page={`/drinks/${d.id}`}/>}
                    /> : null}
                    <div className='plusMinus'>
                        {user && isAdded(cart,"drink", d.id)? 
                        <i 
                        className="fa-solid fa-square-minus"
                        onClick = { (e) => {
                            e.preventDefault();
                            dispatch(cartActions.removeFromCartThunk(d));
                        }}
                        ></i>
                        : null}
                        {isAdded(cart,"drink", d.id)? <span className='numOfdrink'>{numOfAdded(cart,"drink", d.id)}</span> : null}
                        { user && isAdded(cart,"drink", d.id)? 
                        <i 
                        className="fa-solid fa-square-plus"
                        onClick = { async(e) => {
                            e.preventDefault();
                            if(user){
                                await dispatch(cartActions.addToCartThunk(d))
                            }
                        }}
                        ></i>
                        : null}
                    </div>
                        </div>
                    ))}
            {removeDuplicate(cart_custs).map((c)=>(
                <div className="eaCustInCart" key={cart_custs.indexOf(c)}>
                    <img src={c.drinks_customization.imageUrl}
                    alt='img'
                    style={{height:"80px",width:"80px", borderRadius:"50%", objectFit:"cover"}}
                    />
                    <div className="custcartDiv">
                        <h4>{c.drinks_customization.name}</h4>
                        <div className="custDetail">
                            <p className="cartP">Size: {c.size}</p>
                            <p className="cartP">Milk: {c.milk}</p>
                            <p className="cartP">Shots: {c.shotOptions} {c.shotOptions < 2 ? "shot" : "shots"}</p>
                            <p className='cartP'>Expresso Roast: {c.expressoRoastOptions}</p> 
                            <p className='cartP'>Tea Base: {!c.teaBase? 'None': c.teaBase}</p>
                            <p className='cartP'>Additionals:</p>
                            <p className="cartP">{c.toppings}</p>
                            <p className="cartP">{c.flavors}</p>
                            <p className="cartP">{c.addIns}</p>
                            <p className="cartP">{c.sweeteners}</p>
                            <p className="cartP">${c.drinks_customization.price}</p>
                        </div>
                            {!user ? <OpenModalButton 
                        buttonText= "Add to Cart"
                        modalComponent={<SignUpLoginModal page={`/customizations/${c.id}`}/>}
                    /> : null}</div>
                    <div className='plusMinus'>
                        {user && isAdded(cart,"customization", c.id)? 
                        <i 
                        className="fa-solid fa-square-minus"
                        onClick = { (e) => {
                            e.preventDefault();
                            
                            dispatch(cartActions.removeFromCartThunk(c))
                            
                        }}
                        ></i>
                        : null}
                        {isAdded(cart,"customization", c.id)? <span className='numOfdrink'>{numOfAdded(cart,"customization", c.id)}</span> : null}
                        { user && isAdded(cart,"customization", c.id)? 
                        <i 
                        className="fa-solid fa-square-plus"
                        onClick = { async(e) => {
                            e.preventDefault();
                            if(user){
                                await dispatch(cartActions.addToCartThunk(c))
                            }
                        }}
                        ></i>
                        : null}
                    </div>
                    </div>
                    
                    ))}
            
            <div className="priceSumDiv">
                <p className="priceSummary">Subtotal: ${total}</p>
                <p className="priceSummary">Tax(10.5%): ${(total*0.105).toFixed(2)}</p>
                <p className="priceSummary">Total: ${(total*1.105).toFixed(2)}</p>
                <button
                style={{marginTop: '20px'}}
                onClick={handleCheckOut}
                >Let's order</button>
                {hasSubmitted && Boolean(Object.values(errors).length) ? (
                    <p className="errors">{errors.funds}</p> ) : null}
            </div>
        </div>
    )

    
}

export default CurrentCart;