const LOAD_DRINKS = "drinks/load_all";
const LOAD_DRINK_DETAIL = "drinks/load_one";

const CLEAR_DRINK_DETAIL = "drinks/clear_drink_detail";
const CLEAR_DRINKS = "drinks/clear_drinks"
///////////   ACTIONS    //////////////
export const actionLoadAllDrinks = (drinks) => ({
  type: LOAD_DRINKS,
  drinks,
});

export const actionLoadDrinkDetail = (drink) => ({
  type: LOAD_DRINK_DETAIL,
  drink,
});

export const actionClearDrinks = () => ({
  type: CLEAR_DRINKS
});

export const actionClearDrink = () => ({
  type: CLEAR_DRINK_DETAIL
})

///////////   THUNKS     ///////////////

//get all
export const getAllDrinksThunk = () => async (dispatch) => {
    const response = await fetch("/api/drinks");
  if (response.ok) {
    const drinksRes = await response.json();
    const drinks = drinksRes.drinks;
    await dispatch(actionLoadAllDrinks(drinks));
    return drinks;
  }
  return response;
};

//get one
export const getDrinkDetailThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${id}`);

  if (response.ok) {
    const drink = await response.json();
    // console.log('from thunk', drink)
    await dispatch(actionLoadDrinkDetail(drink));
    return drink;
  }
};


////////////   REDUCER     ///////////////
const initialState = {
  allDrinks: {},
  singleDrink: {},
  
};

const drinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DRINKS:
            const allDrinks = {};
            action.drinks.forEach((drink)=> {
                allDrinks[drink.id] = drink;
            });
            return {...state, allDrinks: {...allDrinks}};
        case LOAD_DRINK_DETAIL:
            return {...state, singleDrink: {...action.drink}}
        case CLEAR_DRINKS:
            return {...state, allDrinks: {}}
        case CLEAR_DRINK_DETAIL:
            return { ...state, singleDrink: {}};
        default:
            return state;
    }
}

export default drinkReducer;