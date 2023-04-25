import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
// import DrinkIndexItem from './DrinkIndexItem'
// import Drink from "../SingleDrink";
import * as cartActions from '../../store/cart';

function AllCarts () {
    const dispatch = useDispatch();
    const cartsObj = useSelector((state) => state.carts.allCarts);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(cartActions.getAllCartsThunk());

        return () => {
            dispatch(cartActions.actionClearCarts());
        }
    }, [dispatch])

    if(!cartsObj) return (<div>
        <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
    const carts = Object.values(cartsObj);

    return (
        <div>
            <h1>All Orders</h1>
            {carts.map((cart) => (
                <div key = {carts.indexOf(cart)}>
                    <p>Cart Id: {cart.id}</p>
                    <p>Purchased Time: {cart.paid_time}</p>
                    <p>Customer Info: {cart.User.email}</p>
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
                    <p>Total Price: $ {cart.total_price}</p>
                </div>
            ))}
        </div>
    )
}

export default AllCarts;