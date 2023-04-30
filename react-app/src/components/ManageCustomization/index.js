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
import { useModal } from '../../context/Modal';
import ConfirmModal from '../SingleDrink/confirmModal';
import SignUpLoginModal from "../Signup_LoginModal";
import { isAdded, numOfAdded } from "../SingleDrink";
function CurrentCustomizations() {
    const dispatch = useDispatch();
    const custObj = useSelector((state)=>state.customizations.allUserCustomizations);
    const user = useSelector((state)=>state.session.user)
    const currentCart = useSelector((state)=>state.carts.currentCart)
    const { setModalContent, setOnModalClose } = useModal();

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
            
            {!custs.length ? <div className="emptyCust">
                <h1>My Favorites</h1>
                <h2>Oops! There is no customizations created yet.</h2>
                
            </div> : null}
            {custs.length !== 0 ? 
                <div>
                    <h1>My Favorites</h1>
                    {
                        custs.map((c)=>(
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
                                {user && !isAdded(currentCart,'customization', c.id) ? <button
                                onClick = {async (e) => {
                                    e.preventDefault();
                                    if(user){
                                        await dispatch(cartActions.addToCartThunk(c))
                                    }
                                    setModalContent(<ConfirmModal />);
                                    }}
                                >Add</button>
                                : null} 
                                {!user ? <OpenModalButton 
                                    buttonText= "Add to Cart"
                                    modalComponent={<SignUpLoginModal page={`/customizations`}/>}
                                /> : null}
                                <div className='plusMinus'>
                                    {user && isAdded(currentCart,'customization', c.id)? 
                                    <i 
                                    className="fa-solid fa-square-minus"
                                    onClick = { (e) => {
                                        e.preventDefault();
                                        
                                        dispatch(cartActions.removeFromCartThunk(c))
                                        
                                    }}
                                    ></i>
                                    : null}
                                    {isAdded(currentCart, 'customization', c.id)? <span className='numOfdrink'>{numOfAdded(currentCart, 'customization', c.id)}</span> : null}
                                    { user && isAdded(currentCart, 'customization', c.id)? 
                                    <i 
                                    className="fa-solid fa-square-plus"
                                    onClick = { async(e) => {
                                        e.preventDefault();
                                        if(user){
                                            await dispatch(cartActions.addToCartThunk(c))
                                        }
                                    }}
                                    ></i> 
                                    : null}
                                </div>
                                <OpenModalButton
                                buttonText='Edit'
                                modalComponent={<EditCustomization customization={c}/>} />
                                <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteCustomization customization={c}/>} />
                            </div>
                        </div>))} 
                </div> : null}
                
        </div>
    )
}

export default CurrentCustomizations;