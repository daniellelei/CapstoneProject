import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";

const DrinkIndexItem = ({
    drink,
    user,
    page,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div key={drink.id}>
            <Link to={`/drinks/${drink.id}`}>
                <div>
                    <img
                        src = {drink.imageUrl}
                        alt = {drink.name}
                    />
                    <p>{drink.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default DrinkIndexItem;