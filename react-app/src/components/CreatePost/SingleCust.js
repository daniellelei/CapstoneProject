import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";

export const checkChosen = (custChosen, cust) => {
        let res = false
        if(custChosen !== undefined || custChosen?.length>0){
            for (let cust_chosen of custChosen) {
                if (cust_chosen.id === cust.id) {
                    res = true
                    break;
                }
            }     
        }
        return res;
    }

export const getIndex = ( custChosen, c) => {
        
        let ind = -1;
        if(custChosen !== undefined || custChosen?.length>0){
            for (let i = 0; i < custChosen.length; i++) {
                
                if (custChosen[i].id === c.id) {
                    console.log(`getIndex custChosen ${i} id`, custChosen[i].id)
                    console.log ('getIndex c.id', c.id)
                    ind = i;
                    break;
                }
            }
        }
        return ind;
    }

const SingleCust = ({
    setCustChosen,
    custChosen, 
    user,
    cust,
}) => {

    const dispatch = useDispatch();

    

    const [chosen, setChosen] = useState(false);
    
    // useEffect(()=> {
        
    //     checkChosen(custChosen, cust);
    // }, [dispatch])

    return (
    <div key={cust.id} className='eaCreatePostCust'>
            <div className="eaCustDetailCreatePost">
                <p>{cust.Drink.name}</p>
                <img className="drinkImg" src = {cust.Drink.imageUrl}/>
                <div>
                    <p className="postDate">Size: {cust.size}</p>
                    <p className="postDate">Milk Option:{cust.milk}</p>
                    <p className="postDate">Shot Options: {cust.shotOptions}</p>
                    <p className='postDate'>Expresso Roast: {cust.expressoRoastOptions}</p> 
                    <p className='postDate'>Tea Base: {cust.teaBase}</p>
                    <p className='postDate'>Additionals:</p>
                    <p className="cartP">{cust.toppings}</p>
                    <p className="cartP">{cust.flavors}</p>
                    <p className="cartP">{cust.addIns}</p>
                    <p className="cartP">{cust.sweeteners}</p>
                    
                    <p className="postDate">${cust.Drink.price}</p>
                </div>
            </div>
            <div>
                {/* <p>{console.log(`checkChosen ${cust.id}`,checkChosen(custChosen,cust))}</p> */}
                {chosen ? (<button
                onClick = { async (e) => {
                    e.preventDefault()
                    await dispatch(postsAction.actionRemoveChosenCust(cust))
                    setChosen(false)
                }

                }
                >Remove</button>) : (<button
                onClick = { async(e) => {
                    e.preventDefault()
                    await dispatch(postsAction.actionAddChosenCust(cust))
                    setChosen(true)
                }}
                >Choose</button>)}
            </div>
        </div>
    )





}

export default SingleCust



