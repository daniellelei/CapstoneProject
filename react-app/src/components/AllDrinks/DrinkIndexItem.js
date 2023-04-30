import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import * as cartActions from '../../store/cart';
import './AllDrinks.css'
import OpenModalButton from "../OpenModalButton";
import SignUpLoginModal from "../Signup_LoginModal";
import { isAdded, numOfAdded } from "../SingleDrink";
import ConfirmModal from '../SingleDrink/confirmModal';
import { useModal } from '../../context/Modal';

const DrinkIndexItem = ({
    drink,
    user,
    page,
    currentCart,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent, setOnModalClose } = useModal();

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
                onClick = { (e) => {
                    e.preventDefault();
                    console.log('hit me minus drink.id ',drink.id)
                    dispatch(cartActions.removeFromCartThunk(drink))
                    console.log('after hitting thunkkk', drink.id)
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
    )
}

export default DrinkIndexItem;



{/* <div className="AddBtn">
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
            </div> */}