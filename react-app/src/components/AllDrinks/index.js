import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import DrinkIndexItem from './DrinkIndexItem'
import Drink from "../SingleDrink";
import * as drinkActions from '../../store/drink';
import './AllDrinks.css'
import OpenModalItem from "../OpenModalItem";
function AllDrinks(){
const dispatch = useDispatch();
  const drinksObj = useSelector((state) => state.drinks.allDrinks);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(drinkActions.getAllDrinksThunk());
    
    return () => {
      dispatch(drinkActions.actionClearDrinks());
    };
  }, [dispatch]);

  if(!drinksObj) return <div>Loading</div>
  const drinks = Object.values (drinksObj);

  return (
    <div>
      <nav className="allDrinks">
        
        {drinks.map((drink) => (
          <div  key={drink.id}>
            <DrinkIndexItem drink={drink} key={drink.id} user={user} page="AllDrinks" />
          </div>
        ))}
      </nav>
    </div>
  )

}

export default AllDrinks;