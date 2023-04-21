import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as customizationActions from '../../store/customization';

const singleCustomization = () =>{
    const {customizationId} = useParams();
    const dispatch = useDispatch();

    const customization = useSelector((state)=>state.customization.singleCustomization);
    const user = useSelector((state)=>state.session.user);

    useEffect(() => {
        dispatch(customizationActions.getCustomizationDetailThunk(customizationId))
    },[dispatch])

    if(!customization?.id) return <div>Loading</div>

    return (
        <div>
            <p>customization.</p>
        </div>
    )
}

export default singleCustomization;