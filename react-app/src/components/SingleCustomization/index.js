import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import * as cartActions from '../../store/cart';
import OpenModalButton from '../OpenModalButton';
import EditCustomization from '../EditCustomization';
import DeleteCustomization from '../DeleteCustomization';
import './SingleCustomization.css'
const SingleCustomization = () =>{
    const {customizationId} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    let customization = useSelector((state)=>state.customizations.singleCustomization);
    const cart = useSelector((state) => state.carts.currentCart);
    // console.log('currentcart', cart.id)
    const cartId = cart.id;
    const user = useSelector((state)=>state.session.user);

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
            <p>{customization.Drink.name}</p>
            <img className='drinkImg' src={customization.Drink.imageUrl} />
            <div>
                <p>Size: {customization.size}</p>
                <p>Milk options: {customization.milk}</p>
                <p>Shot Options: {customization.shotOptions}</p>
                <p>Expresso Roast: {customization.expressoRoastOptions}</p>
            </div>
            <div className='singleCustBottom'>
                <button
                onClick ={ async (e) => {
                    e.preventDefault();
                    await dispatch(cartActions.addToCartThunk(customization));
                }}
                >Add to Cart</button>
                <OpenModalButton
                buttonText='Edit'
                modalComponent={<EditCustomization customization={customization}/>} />
                <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteCustomization customization={customization}/>} />
            </div>
        </div>
    )
}

export default SingleCustomization;