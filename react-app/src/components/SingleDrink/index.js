import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import * as drinkActions from '../../store/drink';
import * as cartActions from '../../store/cart';
import OpenModalButton from '../OpenModalButton';
import CreateCustomization from '../CreateCustomization';

import "./SingleDrink.css"
const Drink = () => {
    // console.log('inside single drink')
    const {drinkId} = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const drink = useSelector((state)=>state.drinks.singleDrink);
    const user = useSelector((state)=> state.session.user);

    useEffect(()=>{
        // console.log('inside useEffect')
        dispatch(drinkActions.getDrinkDetailThunk(drinkId));

        return () => dispatch(drinkActions.actionClearDrink());
    },[dispatch, drinkId])

    if(!drink?.id) return <div>Loading</div>

    return (
        <div className='OneDrink'>
            <img 
                className="drinkImg"
                src = {drink.imageUrl}
                alt = "drink.url"
            />
            <p>{drink.name}</p>
            <p>Size: Grande</p>
            <p>${drink.price}</p>
            <OpenModalButton
            buttonText='Customize'
            modalComponent={<CreateCustomization drink={drink}/>} />
            <button
            onClick = {async (e) => {
                e.preventDefault();
                await dispatch(cartActions.addToCartThunk(drink))
                history.push('/drinks')
            }}
            >Add to Cart</button>
        </div>
    )

}

export default Drink;