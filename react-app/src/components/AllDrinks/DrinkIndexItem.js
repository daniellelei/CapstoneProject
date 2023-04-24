import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import * as cartActions from '../../store/cart';
import './AllDrinks.css'

const DrinkIndexItem = ({
    drink,
    user,
    page,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div  key={drink.id}>
            <Link to={`/drinks/${drink.id}`}>
                <div className='eaDrink'>
                    <img
                        src = {drink.imageUrl}
                        alt = {drink.name}
                        className="drinkImg"
                    />
                    <p>{drink.name}</p>
                    <p>Size: Grande</p>
                    <button
                    onClick = {async (e) => {
                        e.preventDefault();
                        if(!user){
                            window.alert('You must be logged in to order a drink.')
                        } else {
                            await dispatch(cartActions.addToCartThunk(drink))
                            history.push('/drinks')
                        }
                    }}
                    >Add to Cart</button>
                </div>
            </Link>
        </div>
    )
}

export default DrinkIndexItem;