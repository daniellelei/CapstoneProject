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
    <div key={cust.id}>
            <div>
                <p>{cust.Drink.name}</p>
                <img className="drinkImg" src = {cust.Drink.imageUrl}/>
                <div>
                    <p>Size: {cust.size}</p>
                    <p>Milk Option:{cust.milk}</p>
                    <p>Shot Options: {cust.shotOptions}</p>
                    <p>Expresso Roast: {cust.expressoRoastOptions}</p>
                    <p>${cust.Drink.price}</p>
                </div>
            </div>
            <div className="allCustBottom">
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



{/* <button
                key={cust.id}
                // className={shown(chosen)}
                onClick ={ (e) => {
                    e.preventDefault();
                    // if (checkChosen(custChosen,c)===true){
                    //     let index = getIndex(custChosen,c)
                    //     if (index !== -1) {
                    //         custChosen.splice(index, 1)
                    //         setCustChosen(custChosen)
                    //     }
                    // } else {
                    //     custChosen.push(c)
                    //     setCustChosen(custChosen)
                    // }
                    const custsIdArr = []
                    if (custChosen?.length > 0) {
                        for ( let a of custChosen) {
                            custsIdArr.push(a.id)
                    }}

                    console.log('custChosen all id', custsIdArr)
                    if (custsIdArr.includes(c.id)) {
                        let i = custChosen.indexOf(c)
                        custChosen.splice(i, 1)
                        setCustChosen(custChosen)
                        setButtonText('Choose')
                    } else {
                        custChosen.push(c)
                        setCustChosen(custChosen)
                        setButtonText('Remove')
                    }
                    setCustChosen(custChosen)
                    console.log('inside click checkChosen', checkChosen(custChosen,c))
                }}
                id = 'style'
                >{checkChosen(custChosen,c)===true ? "Remove" : "Choose"}</button>
                 */}