const LOAD_CARTS = "carts/load_all";
const LOAD_CART_DETAIL = "carts/load_one";
const LOAD_ALL_USER_CARTS = "carts/load_all_user_carts";
const LOAD_CURRENT_CART = 'carts/load_current_cart'
const LOAD_UNPROCESSED_CARTS = 'carts/load_unproccessed_carts'

const PROCESS_CART = 'carts/process_cart';
const ADD_TO_CART = "carts/addedToCart";
const REMOVE_FROM_CART = "carts/removeFromCart"
const CHECK_OUT = 'carts/checkOut'

const CREATE_CART = "carts/create_cart";
const UPDATE_CART = "carts/update_cart";
const REMOVE_CART = "carts/delete_cart";

const CLEAR_CART = "carts/clear_cart";
const CLEAR_CARTS = "carts/clear_carts";
const CLEAR_UNPROCESSED_CARTS = 'carts/clear_unprocessed_carts';
///////////   ACTIONS    //////////////
export const actionLoadAllCarts = (carts) => ({
  type: LOAD_CARTS,
  carts,
});

export const actionLoadCartDetail = (cart) => ({
  type: LOAD_CART_DETAIL,
  cart,
});

export const actionLoadUserCarts = (carts) => ({
    type: LOAD_ALL_USER_CARTS,
    carts
});

export const actionLoadCurrentCart = (cart) => ({
    type: LOAD_CURRENT_CART,
    cart
});

export const actionLoadUnprocessedCarts =  (carts) => ({
  type: LOAD_UNPROCESSED_CARTS,
  carts
})

export const actionProcessCart = (cart) => ({
  type: PROCESS_CART,
  cart
})

export const actionAddToCart = (customizations) => ({
  type: ADD_TO_CART,
  customizations
})

export const actionRemoveFromCart = (customizationId) => ({
  type: REMOVE_FROM_CART,
  customizationId
})

export const actionCheckOut = (cart) => ({
  type: CHECK_OUT,
  cart
})

export const actionCreateCart = (cart) => ({
  type: CREATE_CART,
  cart,
});

export const actionUpdateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const actionDeleteCart = (cart) => ({
  type: REMOVE_CART,
  cart,
});

export const actionClearCart = () => ({
  type: CLEAR_CART,
});

export const actionClearCarts = () => ({
  type: CLEAR_CARTS,
});

export const actionClearUnprocessedCart = () => ({
  type:CLEAR_UNPROCESSED_CARTS,
})
///////////   THUNKS     ///////////////

//get all
export const getAllCartsThunk = () => async (dispatch) => {
    const response = await fetch("/api/carts");
  if (response.ok) {
    const cartsRes = await response.json();
    // const carts = cartsRes.carts;
    console.log('inside get all thunk', cartsRes)
    await dispatch(actionLoadAllCarts(cartsRes));
    return cartsRes;
  }
  return response;
};
//get unprocessed
export const getUnprocessedCartsThunk = () => async (dispatch) => {
    const response = await fetch("/api/carts/unprocessed");
    console.log('hitting unprocessed thunk');
  if (response.ok) {
    const cartsRes = await response.json();
    console.log('inside get unprocessed thunk', cartsRes)
    await dispatch(actionLoadUnprocessedCarts(cartsRes));
    return cartsRes;
  }
  return response;
};
//get one
export const getCartDetailThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${id}`);

  if (response.ok) {
    const cart = await response.json();
    // console.log('from thunk', cart)
    await dispatch(actionLoadCartDetail(cart));
    return cart;
  }
};

//get user carts
export const getUserCartThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/current`);

  if (response.ok) {
    const cart = await response.json();
    // console.log('inside user thunk', cart)
    await dispatch(actionLoadUserCarts(cart));
    return cart;
  }
};
//get current cart
export const getCurrentCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/carts/lastcurrent`);

  if (response.ok) {
    const cart = await response.json();
    // console.log('inside current cart thunk', cart)
    await dispatch(actionLoadCurrentCart(cart));
    return cart;
  }
};

//create cart
export const createCartThunk = (user) => async (dispatch) => {
  const res = await fetch(`/api/carts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const cart = await res.json();
    await dispatch(actionCreateCart(cart));
    return cart;
  }
};

export const updateCartThunk = (cart, cartId) => async (dispatch) => {
  const res = await fetch(`/api/carts/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
  if (res.ok) {
    const updatedCart = await res.json();
    await dispatch(actionUpdateCart(updatedCart));
    return updatedCart;
  }
  return res;
};

export const deleteCartThunk = (cartId) => async (dispatch) => {
  const res = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    await dispatch(actionDeleteCart(cartId));
  }
  return res;
};

//add to cart
export const addToCartThunk = (custOrDrink) => async (dispatch) => {
  
  const cartResponse = await fetch(`/api/carts/lastcurrent`);
  const cart = await cartResponse.json();
  // console.log('add to cart**********', cart)
  if(custOrDrink.name){
    const response = await fetch(`/api/drinks/${custOrDrink.id}/addtocart`, {
      method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
    });
    if (response.ok) {
    const updatedCustomizations = await response.json();
    // console.log('add drink thunk', updatedCustomizations)
    await dispatch(actionAddToCart(updatedCustomizations));
    const cartResponse = await fetch(`/api/carts/lastcurrent`);
    const cart = await cartResponse.json();
    await dispatch(actionLoadCurrentCart(cart));
    return updatedCustomizations;
  }
  } else {
    const response = await fetch(`/api/customizations/${custOrDrink.id}/addtocart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (response.ok) {
      const updatedCustomizations = await response.json();
      // console.log('addthunk', updatedCustomizations)
      await dispatch(actionAddToCart(updatedCustomizations));
      const cartResponse = await fetch(`/api/carts/lastcurrent`);
      const cart = await cartResponse.json();
      await dispatch(actionLoadCurrentCart(cart));
      return updatedCustomizations;
    }
  }
};

//checkout
export const checkOutThunk = (totalPrice) => async (dispatch) => {
  const cartResponse = await fetch(`/api/carts/lastcurrent`);
  const cart = await cartResponse.json();
  if(totalPrice > 0){
    const response = await fetch(`/api/carts/${cart.id}`, {
      method: 'PATCH',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(totalPrice)
    });
    if(response.ok) {
      await dispatch(actionCheckOut());
    }

  }
}


//remove from cart
export const removeFromCartThunk = (custOrDrink) => async (dispatch) => {
  const cartResponse = await fetch(`/api/carts/lastcurrent`);
  const cart = await cartResponse.json();
  // console.log('add to cart**********', cart)
  if(custOrDrink.name){
    const response = await fetch(`/api/drinks/${custOrDrink.id}/removefromcart`, {
      method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
    });
    if (response.ok) {
    const cartResponse = await fetch(`/api/carts/lastcurrent`);
    const cart = await cartResponse.json();
    await dispatch(actionLoadCurrentCart(cart));
    return cart;
  }
  } else {
    const response = await fetch(`/api/customizations/${custOrDrink.id}/removefromcart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (response.ok) {
      // const updatedCustomizations = await response.json();
      // console.log('addthunk', updatedCustomizations)
      await dispatch(actionRemoveFromCart(custOrDrink.id));
      const cartResponse = await fetch(`/api/carts/lastcurrent`);
      const cart = await cartResponse.json();
      await dispatch(actionLoadCurrentCart(cart));
      return cart;
    }
  }
}

//process
export const processCartThunk = (cart) => async (dispatch) => {

  const response = await fetch(`/api/carts/${cart.id}/process`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(cart),
  });
  if (response.ok) {
    const carts = await response.json();
    await dispatch(actionProcessCart(cart));
    return carts;
  }
}



////////////   REDUCER     ///////////////
const initialState = {
  allCarts: {},
  unprocessedCarts: {},
  currentCart:{},
  cartCusts: {}
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CARTS:
            const allCarts = {};
            action.carts.forEach((cart)=> {
                allCarts[cart.id] = cart;
            });
            return {...state, allCarts: {...allCarts}};
        case LOAD_UNPROCESSED_CARTS:
            const allUnprocessedCarts = {};
            action.carts.forEach((cart)=>{
              allUnprocessedCarts[cart.id] = cart;
            });
            return {...state, unprocessedCarts: {...allUnprocessedCarts}}
        case LOAD_CART_DETAIL:
            return {
              ...state, 
              // singleCart: {...action.cart},
              currentCart: {...action.cart},
            }
        case LOAD_ALL_USER_CARTS:
        const allUserCarts = {};
        action.carts.forEach((cart)=>{
          allUserCarts[cart.id] = cart;
        })
            return {...state, allUserCarts: {...allUserCarts}};
        case LOAD_CURRENT_CART:
          return {
            ...state,
            currentCart: {...action.cart},
          }
        case PROCESS_CART:
          const newS = {...state};
          delete newS.unprocessedCarts[action.cart.id]
          return newS;
        case ADD_TO_CART:
        const allCartCusts = {};
        // console.log('inside reducer', action.customizations)
        action.customizations.forEach((customization) => {
          allCartCusts[customization.id] = customization;
        });
        return {...state, cartCusts: {...allCartCusts}}
        // return {...state, cartCusts: action.customizations}
        case REMOVE_FROM_CART:
          const new_State = {...state};
          delete new_State.cartCusts[action.id]
          return new_State;
        case CHECK_OUT:
          return {...state, currentCart:{}}
        case CREATE_CART:
            return {
                ...state,
                allCarts: { ...state.allCarts, [action.cart.id]: action.cart },
                // singleCart: {...action.cart},
                currentCart: {...action.cart},
                allUserCarts:{...state.allUserCarts, [action.cart.id]: action.cart}
            };
        case UPDATE_CART:
        return {
          ...state,
          allCarts:{...state.allCarts, [action.cart.id]:action.cart},
          // singleCart: {...action.cart},
          currentCart: {...action.cart},
          allUserCarts:{...state.allUserCarts, [action.cart.id]: action.cart}
        }
        case REMOVE_CART:
            const newState = {...state};
            delete newState.allCarts[action.id];
            delete newState.allUserCarts[action.id];
            
            return newState;
        case CLEAR_CARTS:
            return { ...state, allCarts: {} };
        case CLEAR_CART:
            return { ...state, currentCart: {}, };
        case CLEAR_UNPROCESSED_CARTS:
            return { ...state, unprocessedCarts: {} };
        default:
            return state;
    }
}

export default cartReducer;