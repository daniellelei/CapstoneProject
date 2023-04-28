import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";

export const chosen = (customization, custs) => {
    let chosenOrNot = false;
    const custsIdArr = []
    if (custs?.length > 0) {
        for ( let i in custs) {
            custsIdArr.push(i.id)
        }
        if(custsIdArr.includes(customization.id)) chosenOrNot = true;
    }
    return chosenOrNot;
}

const SingleCust = ({
    customization,
    user,
    custs,
}) => {

    const [chosen, setChosen] = useState(chosen(customization, custs));

}

export default SingleCust