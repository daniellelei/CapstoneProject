import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as cartActions from "../../store/cart"
// import OpenModalicon from "../OpenModalicon";
// import EditCustomization from "../EditCustomization";
// import OpenModalButton from '../OpenModalButton';
// import DeleteCustomization from "../DeleteCustomization";

function CurrentCart() {
    const dispatch = useDispatch();
    const cartObj = useSelector((state)=>state.carts.allUserCarts);

    useEffect(() => {
        dispatch(cartActions.getUserCartThunk());
    }, [dispatch])
    if(!cartObj) return <div>Loading</div>
    const carts = Object.values(cartObj);
    console.log('carts', carts)
    const custs = carts[0].Customization
    console.log('cust', custs[0])

    return (
        <div>
            {carts.map((c) => (
                <div>
                    <p>cart Id: {c.id}</p>
                    <p>user Id: {c.user_id}</p>
                    <p>{c.total_price}</p>
                    {custs.map((u)=> (
                        <div>
                            <p>customization {u.id}</p>
                            <p>{u.milk}</p>
                            <p>{u.expressoRoastOptions}</p>
                        </div>
                    ))}
                    <div></div>
                </div>
            ))}
        </div>
    )

    // return (
    //     <div className="AllCust">
    //         {custs.map((c)=>(
    //             <div key={c.id} className="eaCust">
    //                 <NavLink className="eaCust" key={c.id} to={`/carts/${c.id}`}>
    //                     <div>{c}</div>
                        
    //                 </NavLink>
    //                 {/* <OpenModalButton
    //                 buttonText='Edit'
    //                 modalComponent={<EditCustomization customization={c}/>} />
    //                 <OpenModalButton
    //                 buttonText='Delete'
    //                 modalComponent={<DeleteCustomization customization={c}/>} /> */}
    //             </div>
    //         ))}
    //     </div>
    // )
}

export default CurrentCart;