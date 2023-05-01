import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
// import DrinkIndexItem from './DrinkIndexItem'
// import Drink from "../SingleDrink";
import * as cartActions from '../../store/cart';
import { removeDuplicate, numOfDrink } from "../UnprocessedCarts/unprocessedItem";
import './AllCarts.css'
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
        <div className="allCarts">
            <h1>All Orders</h1>
            <p>These are all the orders that are purchased in the past.</p>
            {!carts?.length ? <h4>There is no orders yet!</h4> : null}
            {carts?.map((cart) => (
                <div key = {carts.indexOf(cart)} className="eaSale">
                    <h2>Order Id: {cart.id}</h2>
                    <p className="paidTime">Purchased Time: {cart.paid_time}</p>
                    <p className="paidTime">Customer Info: {cart.User.email}</p>
                    {!cart.drinks?.length ? null :
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
                    {!cart.customizations?.length ? null :
                    <div>
                        <h4 className='typeOfdrink'>Customized Drinks: </h4>
                        {removeDuplicate(cart.customizations).map((customization) => (
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