import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import * as cartActions from '../../store/cart';
import './AllDrinks.css'
import DrinkIndexItem from "./DrinkIndexItem";

const Category = ({
    category,
    drinks,
    user,
    page,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div>
            <h1>{category}</h1>
            {drinks.map((drink) => (
            <div  key={drink.id}>
              <DrinkIndexItem drink={drink} key={drink.id} user={user} page="AllDrinks" />
            </div>
          ))}
        </div>
    )
}

export default Category;