import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/cart';

function UnprocessedItem ({ cart}) {
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
            <p>Order Id: {cart.id}</p>
            <p>Purchased Time: {cart.paid_time}</p>
            <p>Customer Info: {cart.User.username}</p>
            {!cart.drinks.length ? null :
            <div>
                <h4>Regular Drinks: </h4>
                {cart.drinks.map((drink) => (
                    <ol key={cart.drinks.indexOf(drink)}>
                        <li>{drink.name}</li>
                    </ol>
                ))}
            </div>
            }
            {!cart.customizations.length ? null :
            <div>
                <h4>Customized Drinks: </h4>
                {cart.customizations.map((customization) => (
                    <ol key={cart.customizations.indexOf(customization)}>
                        <li>{customization.drinks_customization.name}</li>
                        <li>Size: {customization.size}</li>
                        <li>Milk: {customization.milk}</li>
                        <li>Shots: {customization.shotOptions}</li>
                        <li>Expresso: {customization.expressoRoastOptions}</li>
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