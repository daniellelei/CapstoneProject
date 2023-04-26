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

  if(!drinksObj) return (<div>
        <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
  const drinks = Object.values (drinksObj);

  const IcedCoffee = drinks.filter(drink => drink.category === 'IcedCoffee')
  const HotCoffee = drinks.filter(drink => drink.category === 'HotCoffee')


  return (
    <div>
      <nav className="allDrinks">
        {/* <img src ='https://i.giphy.com/media/ZDNQdzCUjIK9VNUE2c/giphy.webp'/> */}
        {/* <div className='leftAllDrinks'>
          <h2>Iced Coffee</h2>
          <h2>Hot Coffee</h2>
        </div>
        <div className='rightDrinks'> */}
          {drinks.map((drink) => (
            <div  key={drink.id}>
              <DrinkIndexItem drink={drink} key={drink.id} user={user} page="AllDrinks" />
            </div>
          ))}
        {/* </div> */}
      </nav>
    </div>
  )

}

export default AllDrinks;