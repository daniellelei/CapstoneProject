import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageCustomization.css'
import * as customizationActions from "../../store/customization"
import * as cartActions from "../../store/cart"
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
    if(!custObj) return (<div>
        <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
    const custs = Object.values(custObj);

    return (
        <div className="AllCust">
            {custs.map((c)=>(
                <div key={c.id} className="eaCust">
                    <NavLink className="eaCust" key={c.id} to={`/customizations/${c.id}`}>
                        <p>{c.Drink.name}</p>
                        <img className="drinkImg" src = {c.Drink.imageUrl}/>
                        <div>
                            <p>Size: {c.size}</p>
                            <p>Milk Option:{c.milk}</p>
                            <p>Shot Options: {c.shotOptions}</p>
                            <p>Expresso Roast: {c.expressoRoastOptions}</p>
                            <p>${c.Drink.price}</p>
                        </div>
                    </NavLink>
                    <div className="allCustBottom">
                        <button
                        onClick ={ async (e) => {
                            e.preventDefault();
                            await dispatch(cartActions.addToCartThunk(c));
                        }}
                        >Add to Cart</button>
                        <OpenModalButton
                        buttonText='Edit'
                        modalComponent={<EditCustomization customization={c}/>} />
                        <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteCustomization customization={c}/>} />
                    </div>
                </div>
                
            ))}
        </div>
    )
}

export default CurrentCustomizations;