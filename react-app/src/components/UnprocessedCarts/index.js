import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/cart';
import UnprocessedItem from './unprocessedItem';
import './UnprocessedCarts.css'
function UnprocessedCarts () {
    const dispatch = useDispatch();
    const cartsObj = useSelector((state) => state.carts.unprocessedCarts)
    console.log('in components', cartsObj)
    const user = useSelector((state)=> state.session.user);

    useEffect(() => {
        dispatch(cartActions.getUnprocessedCartsThunk());

        return ()=>{
            dispatch(cartActions.actionClearUnprocessedCart());
        }
    }, [dispatch])

    if(!cartsObj) return (<div>
        <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
    const carts = Object.values(cartsObj);
    
    return (
        <div className='todo'>
            <h1>TODO Orders</h1>
            {!carts.length ? <h2>🥳 All the orders have been processed!  Nice job done, team! 🎉</h2> 
            : null}
            {carts.map((cart)=>(
                    <UnprocessedItem cart={cart} key={carts.indexOf(cart)}/>
                ))}
        </div>
                
    )
}

export default UnprocessedCarts;