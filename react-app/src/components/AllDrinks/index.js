import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import DrinkIndexItem from './DrinkIndexItem'
import Category from "./Categories";
import Drink from "../SingleDrink";
import * as drinkActions from '../../store/drink';
import * as cartActions from '../../store/cart';
import './AllDrinks.css'
import OpenModalItem from "../OpenModalItem";
function AllDrinks(){
    const dispatch = useDispatch();
    const drinksObj = useSelector((state) => state.drinks.allDrinks);
    const user = useSelector((state) => state.session.user);
    const categoriesDrinksObj = useSelector((state)=> state.drinks.categoryDrinks)
    const [category, setCategory] = useState('All Drinks');
    const currentCart = useSelector((state)=>state.carts.currentCart)

    useEffect(() => {
      dispatch(drinkActions.getAllDrinksThunk());
      // if(categoryDrinks?.length>0) dispatch(drinkActions.actionLoadCategory(categoryDrinks))
      if(user) dispatch(cartActions.getCurrentCartThunk());
      return () => {
        dispatch(drinkActions.actionClearDrinks());
        dispatch(drinkActions.actionClearCategory());
        
      };
    }, [dispatch]);

    if(!drinksObj ) return (<div>
          <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
      </div>)
    const drinks = Object.values (drinksObj);
    if(!categoriesDrinksObj) dispatch(drinkActions.actionLoadCategory(drinks))
    // const categoriesDrinks = Object.values(categoriesDrinksObj)
    
    const icedCoffee = drinks.filter(drink => drink.subCategory === 'icedCoffee')
    const hotCoffee = drinks.filter(drink => drink.subCategory === 'hotCoffee')
    const icedTea = drinks.filter(drink => drink.subCategory === 'icedTea')
    const hotTea = drinks.filter(drink => drink.subCategory === 'hotTea')
    

    const icedCoffeeClick = async (e) => {
      e.preventDefault();
      setCategory('Iced Coffee')
      await dispatch(drinkActions.actionLoadCategory(icedCoffee))
    }
    const hotCoffeeClick = async (e) => {
      e.preventDefault();
      await dispatch(drinkActions.actionLoadCategory(hotCoffee))
      setCategory('Hot Coffee')
    }

    const icedTeaClick = async (e) => {
      e.preventDefault();
      await dispatch(drinkActions.actionLoadCategory(icedTea))
      setCategory('Iced Tea')

    }
    const hotTeaClick = async (e) => {
      e.preventDefault();
      await dispatch(drinkActions.actionLoadCategory(hotTea))
      setCategory('Hot Tea')

    }
    const allDrinksClick = async (e) => {
      e.preventDefault();
      await dispatch(drinkActions.actionLoadCategory([]))
      setCategory('All Drinks')

    }

    // console.log('category drinks', categoriesDrinksObj)
    if(!categoriesDrinksObj) return <div>loading</div>
    const categoryDrinks = Object.values(categoriesDrinksObj);
    // console.log('cate', categoryDrinks)
    return (
      <div className="DrinksPage">
        <div className="allDrinksTop">
          <h1>Welcome to Coffee or Tea</h1>
        </div>
        <div style={{textAlign:"left", width:"50%"}}>
          <h2>{category}</h2>
        </div>
        <div className="allDrinksBottom">
          <div className="leftDrinkNav">
            <ul>
              <li
              className="eaCategory"
              onClick={allDrinksClick}
              >
                Drinks
              </li>
              <li 
              className="eaCategory"
              onClick={icedCoffeeClick}>
                Iced Coffee
              </li>
              <li 
              className="eaCategory"
              onClick = {hotCoffeeClick}>
                Hot Coffee
              </li>
              <li 
              className="eaCategory"
              onClick = {icedTeaClick}>
                Iced Tea
              </li>
              <li 
              className="eaCategory"
              onClick = {hotTeaClick}>
                Hot Tea
              </li>
            </ul>
          </div>
          <div className="rightDrinkNav">
            
            {categoryDrinks.length === 0 ? (
              drinks.map((drink) => (
                <div key={drink.id}>
                  <DrinkIndexItem drink={drink} key={drink.id} user={user} currentCart={currentCart} page="AllDrinks" />
                </div>
              ))
            ) : null}
            {categoryDrinks.map((drink) => (
              <div  key={drink.id}>
                <DrinkIndexItem drink={drink} key={drink.id} user={user} currentCart={currentCart} page="AllDrinks" />
              </div>
            ))}
          </div>
        </div>

        {/* <nav className="allDrinks">
          <div>
            
          </div>

          {/* <Category category={category} drinks={hotCoffee} user={user} page='AllDrinks' /> */}
          {/* <img src ='https://i.giphy.com/media/ZDNQdzCUjIK9VNUE2c/giphy.webp'/> */}
          {/* <div className='leftAllDrinks'>
            <h2>Iced Coffee</h2>
            <h2>Hot Coffee</h2>
          </div>
          <div className='rightDrinks'> */}
            
          {/* </div> */}
        {/* </nav> */} 
      </div>
    )

  }

export default AllDrinks;