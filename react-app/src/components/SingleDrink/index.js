import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import * as drinkActions from '../../store/drink';
import * as cartActions from '../../store/cart';
import OpenModalButton from '../OpenModalButton';
import SignUpLoginModal from '../Signup_LoginModal';
import CreateCustomization from '../CreateCustomization';
import ConfirmModal from './confirmModal';
import "./SingleDrink.css"
import AddToCartButton from '../AddToCartButton';
const Drink = () => {
    
    const {drinkId} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

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

        return () => dispatch(drinkActions.actionClearDrink());
    },[dispatch, drinkId, loading])

    if(!drink?.id || loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)

    return (
        <div className='OneDrink'>
            <div className='leftOneDrink'>
                <img 
                    className="drinkImg"
                    src = {drink.imageUrl}
                    alt = "drink.url"
                />
                <h2>{drink.name}</h2>
                <p>Size: Grande</p>
                <p>${drink.price}</p>
                {user ? <button
                onClick = {async (e) => {
                    e.preventDefault();
                    if(user){
                        await dispatch(cartActions.addToCartThunk(drink))
                    }
                    }}
                
                >Add</button>
                : <OpenModalButton 
                    buttonText= "Add to Cart"
                    modalComponent={<SignUpLoginModal />}
                />
                }
                 

            </div>
            <div className='rightOneDrink'>
                <h2>Customizations</h2>
                <div>
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