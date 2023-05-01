import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import * as cartActions from '../../store/cart';
import OpenModalButton from '../OpenModalButton';
import EditCustomization from '../EditCustomization';
import DeleteCustomization from '../DeleteCustomization';
import { useModal } from '../../context/Modal';
import ConfirmModal from '../SingleDrink/confirmModal';
import SignUpLoginModal from "../Signup_LoginModal";
import { isAdded, numOfAdded } from "../SingleDrink";
import './SingleCustomization.css'
const SingleCustomization = () =>{
    const {customizationId} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    

    let customization = useSelector((state)=>state.customizations.singleCustomization);
    const currentCart = useSelector((state) => state.carts.currentCart);
    // console.log('currentcart', cart.id)
    const cartId = currentCart.id;
    const user = useSelector((state)=>state.session.user);
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        if(loading) {
            setTimeout(()=> {
                setLoading(false)
            }, 2500);
        }
        dispatch(customizationActions.getCustomizationDetailThunk(customizationId))
        dispatch(cartActions.getCurrentCartThunk())

        return () => dispatch(customizationActions.actionClearCustomization())
    },[dispatch, loading])

    if(!customization?.id|| loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)

    return (
        <div className='singleCust'>
            <div>
                <h4>{customization.Drink.name}</h4>
            </div>
            <div className='singleCustBody'>
                <img className='drinkImg' src={customization.Drink.imageUrl} />
                <div className='singleCustDetail'>
                    <p className='singleCustP'>Size: {customization.size}</p>
                    <p className='singleCustP'>Milk options: {customization.milk}</p>
                    <p className='singleCustP'>Shot Options: {customization.shotOptions}</p>
                    <p className='singleCustP'>Expresso Roast: {customization.expressoRoastOptions}</p> 
                    <p className='singleCustP'>Tea Base: {customization.teaBase}</p>
                    <p className='singleCustP'>Additionals:</p>
                    <p className="cartP">{customization.toppings}</p>
                    <p className="cartP">{customization.flavors}</p>
                    <p className="cartP">{customization.addIns}</p>
                    <p className="cartP">{customization.sweeteners}</p>
                </div>

            </div>
            <div className='singleCustBottom'>
                <div className='singleCustBottomLeft'>
                    {user && !isAdded(currentCart,'customization', customization.id) ? <button
                onClick = {async (e) => {
                    e.preventDefault();
                    if(user){
                        await dispatch(cartActions.addToCartThunk(customization))
                    }
                    setModalContent(<ConfirmModal />);
                    }}
                >Add</button>
                : null} 
                {!user ? <OpenModalButton 
                    buttonText= "Add to Cart"
                    modalComponent={<SignUpLoginModal page={`/customizations/${customization.id}`}/>}
                /> : null}
                
            <div className='plusMinus'>
                {user && isAdded(currentCart,'customization', customization.id)? 
                <i 
                className="fa-solid fa-square-minus"
                onClick = { (e) => {
                    e.preventDefault();
                    console.log('hit me minus customization.id ',customization.id)
                    dispatch(cartActions.removeFromCartThunk(customization))
                    console.log('after hitting thunkkk', customization.id)
                }}
                ></i>
                : null}
                {isAdded(currentCart, 'customization', customization.id)? <span className='numOfdrink'>{numOfAdded(currentCart, 'customization', customization.id)}</span> : null}
                { user && isAdded(currentCart, 'customization', customization.id)? 
                <i 
                className="fa-solid fa-square-plus"
                onClick = { async(e) => {
                    e.preventDefault();
                    if(user){
                        await dispatch(cartActions.addToCartThunk(customization))
                    }
                }}
                ></i>
                : null}
            </div> </div>
            <div className='SingleCustBottomRight'>
                <button className='navButton'
                onClick = {async (e) => {
                                e.preventDefault();
                                setModalContent(<EditCustomization customization={customization} />);
                                }}
                >
                <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className='navButton'
                onClick = {async (e) => {
                                e.preventDefault();
                                setModalContent(<DeleteCustomization customization={customization} />);
                                }}
                >
                <i className="fa-solid fa-trash"></i>
                </button> 
            </div>
            </div>
        </div>
    )
}

export default SingleCustomization;


