const LOAD_DRINKS = "drinks/load_all";
const LOAD_DRINK_DETAIL = "drinks/load_one";
const LOAD_DRINK_CATEGORY = 'drinks/load_category';
const CLEAR_DRINK_DETAIL = "drinks/clear_drink_detail";
const CLEAR_DRINK_CATEGORY = 'drinks/clear_drink_category';
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

export const actionLoadCategory = (drinks) => ({
  type: LOAD_DRINK_CATEGORY,
  drinks,
})

export const actionClearDrinks = () => ({
  type: CLEAR_DRINKS
});

export const actionClearDrink = () => ({
  type: CLEAR_DRINK_DETAIL
})

export const actionClearCategory =()=>({
  type: CLEAR_DRINK_CATEGORY
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
  categoryDrinks:{},
  
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
        case LOAD_DRINK_CATEGORY:
            const allcategoryDrinks={};
            action.drinks.forEach((drink)=> {
              allcategoryDrinks[drink.id] = drink;
            })
            return {...state, categoryDrinks: {...allcategoryDrinks}}
        case CLEAR_DRINKS:
            return {...state, allDrinks: {}}
        case CLEAR_DRINK_DETAIL:
            return { ...state, singleDrink: {}};
        case CLEAR_DRINK_CATEGORY:
            return { ...state, categoryDrinks: {}};
        default:
            return state;
    }
}

export default drinkReducer;