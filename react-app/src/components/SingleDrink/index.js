import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import * as drinkActions from '../../store/drink';
import * as cartActions from '../../store/cart';
import OpenModalButton from '../OpenModalButton';
import SignUpLoginModal from '../Signup_LoginModal';
import CreateCustomization from '../CreateCustomization';
import ConfirmModal from './confirmModal';
import "./SingleDrink.css"
import AddToCartButton from '../AddToCartButton';
import Category from '../AllDrinks/Categories';

export const isAdded = (currentCart, type, id) => {
    if (type === 'drink')
        {
            if(!currentCart?.drinks?.length) return false;
            for (let d of currentCart.drinks) {
                if(d.id === id) return true;
            }
        }
    if (type ==='customization')
        {
            if(!currentCart?.customizations?.length) return false;
            for (let d of currentCart.customizations) {
                if(d.id === id) return true;
            }
        }   
        return false;
    }

export const numOfAdded = (currentCart, type, id) => {
        if (isAdded(currentCart, type, id)===false) return 'Add'
        let num = 0;
        if (type === 'drink'){
            for (let d of currentCart.drinks) {
                if(d.id === id) {
                    num = num + 1
                }
            }
        }
        if (type === 'customization'){
            for (let d of currentCart.customizations) {
                if(d.id === id) {
                    num = num + 1
                }
            }
        }
        return `${num} in cart`
    }
const Drink = () => {
    
    const {drinkId} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { setModalContent, setOnModalClose } = useModal();
    const dispatch = useDispatch();
    const drink = useSelector((state)=>state.drinks.singleDrink);
    const user = useSelector((state)=> state.session.user);
    const currentCart = useSelector((state)=>state.carts.currentCart)

    useEffect(()=>{
        // console.log('inside useEffect')
        if(loading) {
            setTimeout(()=> {
                setLoading(false)
            }, 1500);
        }
        dispatch(drinkActions.getDrinkDetailThunk(drinkId));
        if(user) dispatch(cartActions.getCurrentCartThunk())

        return () => dispatch(drinkActions.actionClearDrink());
    },[dispatch, drinkId, loading])

    const displaySubCategory = (subCategory) => {
        switch (subCategory){
            case "hotCoffee":
                return 'Hot Coffee'
            case "hotTea":
                return 'Hot Tea'
            case "icedCoffee":
                return 'Cold Coffee'
            case "coldTea":
                return "Cold Tea"
            default:
                return null;

        }

    }

    
    

    if(!drink?.id || loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)

    return (
        <div className='OneDrink'>
            <div style={{display:"flex",
            justifyContent:"flex-start",
            alignItems:"center",
            width:"90%",
            gap:"13px"
            }}
            >
                <i style={{color:"black", cursor:"pointer", }}
                onClick={(e)=>{
                    e.preventDefault();
                    history.push("/drinks")
                }}
                className="fa-solid fa-arrow-left fa-xl"></i>
                <h3 style={{
                    backgroundColor:"rgba(238, 237, 237, 0.955)",
                    padding:"5px",
                    borderRadius:"10px"
                }}
                >Menu/{displaySubCategory(drink.subCategory)}/{drink.name}</h3>
            </div>
            <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                width:"80%",

            }}>
                <div className='leftOneDrink'>
                        <img 
                            className="drinkImg"
                            src = {drink.imageUrl}
                            alt = "drink.url"
                        />
                        <h2>{drink.name}</h2>
                        <p>Size: Grande</p>
                        <p>${drink.price}</p>
                        {user && !isAdded(currentCart,"drink", drink.id) ? <button
                        onClick = {async (e) => {
                            e.preventDefault();
                            if(user){
                                await dispatch(cartActions.addToCartThunk(drink))
                            }
                            setModalContent(<ConfirmModal />);
                            }}
                        >Add</button>
                        : null} 
                        {!user ? <OpenModalButton 
                            buttonText= "Add to Cart"
                            modalComponent={<SignUpLoginModal page={`/drinks/${drink.id}`}/>}
                        /> : null}
                        <div className='plusMinus'>
                            {user && isAdded(currentCart,"drink", drink.id)? 
                            <i 
                            className="fa-solid fa-square-minus"
                            onClick = { async(e) => {
                                e.preventDefault();
                                if(user){
                                    await dispatch(cartActions.removeFromCartThunk(drink))
                                }
                            }}
                            ></i>
                            : null}
                            {isAdded(currentCart,"drink", drink.id)? <span className='numOfdrink'>{numOfAdded(currentCart,"drink", drink.id)}</span> : null}
                            { user && isAdded(currentCart,"drink", drink.id)? 
                            <i 
                            className="fa-solid fa-square-plus"
                            onClick = { async(e) => {
                                e.preventDefault();
                                if(user){
                                    await dispatch(cartActions.addToCartThunk(drink))
                                }
                            }}
                            ></i>
                            : null}
                        </div>
                </div>
                <div className='rightOneDrink'>
            </div>
                <div>
                    <h2>Customizations</h2>
                    <CreateCustomization drink={drink} />
                </div>
                {/* <button
                onClick = {async (e) => {
                    e.preventDefault();
                    await dispatch(cartActions.addToCartThunk(drink))
                    history.push('/drinks')
                }}
                >Add to Cart</button> */}
            </div>
        </div>
    )

}

export default Drink;