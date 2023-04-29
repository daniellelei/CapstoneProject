import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import * as cartActions from '../../store/cart';
import './AllDrinks.css'
import OpenModalButton from "../OpenModalButton";
import SignUpLoginModal from "../Signup_LoginModal";

const DrinkIndexItem = ({
    drink,
    user,
    page,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div  key={drink.id} className='eaDrink'>
            <Link to={`/drinks/${drink.id}`}>
                <div className='detail'>
                    <img
                        src = {drink.imageUrl}
                        alt = {drink.name}
                        className="drinkImg"
                    />
                    <p className="drinkname">{drink.name}</p>
                    <p className="price">${drink.price}</p>
                </div>
            </Link>
            <div className="AddBtn">
                {user ? <button
                onClick = {async (e) => {
                    e.preventDefault();
                    if(user){
                        await dispatch(cartActions.addToCartThunk(drink))
                    }
                    }}
                
                >Add</button>
                : <OpenModalButton 
                    buttonText= "Add"
                    modalComponent={<SignUpLoginModal />}
                />
                }
            </div>
        </div>
    )
}

export default DrinkIndexItem;