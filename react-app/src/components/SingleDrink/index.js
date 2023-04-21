import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as drinkActions from '../../store/drink';
import OpenModalButton from '../OpenModalButton';
import CreateCustomization from '../CreateCustomization';
const Drink = () => {
    console.log('inside single drink')
    const {drinkId} = useParams();

    const dispatch = useDispatch();
    const drink = useSelector((state)=>state.drinks.singleDrink);
    const user = useSelector((state)=> state.session.user);

    useEffect(()=>{
        console.log('inside useEffect')
        dispatch(drinkActions.getDrinkDetailThunk(drinkId));
    },[dispatch, drinkId])

    const clickCustomize = async (e) => {
        e.preventDefault();

    }


   

    if(!drink?.id) return <div>Loading</div>

    return (
        <div>
            <img 
                src = {drink.imageUrl}
                alt = "drink.url"
            />
            <p>{drink.name}</p>
            <p>{drink.price}</p>
            <OpenModalButton
            buttonText='Customize'
            modalComponent={<CreateCustomization drink={drink}/>} />
            <button
            onClick = {async (e) => {
                e.preventDefault();
            }}
            >Add to Cart</button>
        </div>
    )

}

export default Drink;