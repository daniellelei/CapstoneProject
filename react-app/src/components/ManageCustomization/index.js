import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageCustomization.css'
import * as customizationActions from "../../store/customization"
// import OpenModalicon from "../OpenModalicon";
import EditCustomization from "../EditCustomization";
import OpenModalButton from '../OpenModalButton';
import DeleteCustomization from "../DeleteCustomization";

function CurrentCustomizations() {
    const dispatch = useDispatch();
    const custObj = useSelector((state)=>state.customizations.allUserCustomizations);

    useEffect(() => {
        dispatch(customizationActions.getUserCustomizationThunk());
        return () => dispatch(customizationActions.actionClearCustomizations());
    }, [dispatch])
    if(!custObj) return <div>Loading</div>
    const custs = Object.values(custObj);

    return (
        <div className="AllCust">
            {custs.map((c)=>(
                <div key={c.id} className="eaCust">
                    <NavLink className="eaCust" key={c.id} to={`/customizations/${c.id}`}>
                        <p>{c.id}</p>
                        <img className="drinkImg" src = {c.Drink.imageUrl}/>
                        <p>{c.milk}</p>
                        <p>{c.size}</p>
                        <p>{c.shotOptions}</p>
                        <p>{c.expressoRoastOptions}</p>
                    </NavLink>
                    <OpenModalButton
                    buttonText='Edit'
                    modalComponent={<EditCustomization customization={c}/>} />
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<DeleteCustomization customization={c}/>} />
                </div>
            ))}
        </div>
    )
}

export default CurrentCustomizations;