import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import OpenModalButton from '../OpenModalButton';
import EditCustomization from '../EditCustomization';
import DeleteCustomization from '../DeleteCustomization';
import './SingleCustomization.css'
const SingleCustomization = () =>{
    const {customizationId} = useParams();
    const dispatch = useDispatch();

    let customization = useSelector((state)=>state.customizations.singleCustomization);
    // customization = customization.Customization
    console.log('cust', customization)
    // console.log('customization', customization.Customization)
    // console.log('customization.drink.name', customization.Drink.name)
    const user = useSelector((state)=>state.session.user);

    useEffect(() => {
        dispatch(customizationActions.getCustomizationDetailThunk(customizationId))
    },[dispatch])

    if(!customization?.id) return <div>Loading</div>

    return (
        <div className='eaCust'>
            <p>customization #: {customization.id}</p>
            <p>drink: {customization.Drink.name}</p>
            <img className='drinkImg' src={customization.Drink.imageUrl} />
            <p>size: {customization.size}</p>
            <p>milk: {customization.milk}</p>
            <p>expresso: {customization.expressoRoastOptions}</p>
            <OpenModalButton
            buttonText='Edit'
            modalComponent={<EditCustomization customization={customization}/>} />
            <OpenModalButton
            buttonText='Delete'
            modalComponent={<DeleteCustomization customization={customization}/>} />
        </div>
    )
}

export default SingleCustomization;