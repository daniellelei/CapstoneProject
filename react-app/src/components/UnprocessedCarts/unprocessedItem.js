import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/cart';
import './UnprocessedCarts.css'
export const removeDuplicate = (items, type) => {
        let res = [];
        let resId = []
        for (let i of items){
            if (!resId.includes(i.id)) {
                resId.push(i.id)
                res.push(i)
            }
        }
        return res;
    }
export const numOfDrink = (cart, drink) => {
        let num = 0;
        for (let d of cart.drinks){
            if(d.id === drink.id) {
                num = num + 1;
            }
        }
        return num;
    }
function UnprocessedItem ({cart}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);

    const doneClick = async (e) => {
        e.preventDefault();
        if(user.username === 'boss' || user.username === 'brista'){
            await dispatch(cartActions.processCartThunk(cart))
            await dispatch(cartActions.getUnprocessedCartsThunk())
        }
    }
    
    

    return (
        <div>
            <h2>Order Id: {cart.id}</h2>
            <p>Purchased Time: {cart.paid_time}</p>
            <p>Customer Info: {cart.User.username}</p>
            {!cart.drinks.length ? null :
            <div>
                <h4 className='typeOfdrink'>Regular Drinks: </h4>
                {removeDuplicate(cart.drinks).map((drink) => (
                    <ol key={cart.drinks.indexOf(drink)}>
                        <li>{drink.name}</li>
                        <li>Qty: {numOfDrink(cart, drink)}</li>
                    </ol>
                ))}
            </div>
            }
            {!cart.customizations.length ? null :
            <div>
                <h4 className='typeOfdrink'>Customized Drinks: </h4>
                {removeDuplicate(cart.customizations).map((customization) => (
                    <ol key={cart.customizations.indexOf(customization)}>
                        <li>customization Id: {customization.id}</li>
                        <li>{customization.drinks_customization.name}</li>
                        <li>Size: {customization.size}</li>
                        <li>Milk: {customization.milk}</li>
                        <li>Shots: {customization.shotOptions}</li>
                        {!customization.expressoRoastOptions?null:<li>Expresso: {customization.expressoRoastOptions}</li>}
                        {!customization.teaBase?null:<li>TeaBase: {customization.teaBase}</li> }
                        {!customization.flavors?null:<li>flavors: {customization.flavors}</li> }
                        {!customization.toppings?null:<li>toppings: {customization.toppings}</li> }
                        {!customization.addIns?null:<li>addIns: {customization.addIns}</li> }
                        {!customization.sweeteners?null:<li>sweeteners: {customization.sweeteners}</li> }
                    </ol>
                ))}
            </div>
            }
            <button
            onClick={doneClick}
            >Done</button>
        </div>
    )
}

export default UnprocessedItem;