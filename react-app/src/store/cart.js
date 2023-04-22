const LOAD_CARTS = "carts/load_all";
const LOAD_CART_DETAIL = "carts/load_one";
const LOAD_ALL_USER_CARTS = "carts/load_all_user_carts";
const LOAD_CURRENT_CART = 'carts/load_current_cart'
const CREATE_CART = "carts/create_cart";
const UPDATE_CART = "carts/update_cart";
const REMOVE_CART = "carts/delete_cart";
const CLEAR_CART = "carts/clear_cart";
const CLEAR_CARTS = "carts/clear_carts";

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

///////////   THUNKS     ///////////////

//get all
export const getAllCartsThunk = () => async (dispatch) => {
    const response = await fetch("/api/carts");
  if (response.ok) {
    const cartsRes = await response.json();
    const carts = cartsRes.carts;
    await dispatch(actionLoadAllCarts(carts));
    return carts;
  }
  return response;
};

//get one
export const getCartDetailThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${id}`);

  if (response.ok) {
    const cart = await response.json();
    console.log('from thunk', cart)
    await dispatch(actionLoadCartDetail(cart));
    return cart;
  }
};

//get user carts
export const getUserCartThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/carts/current`);

  if (response.ok) {
    const cart = await response.json();
    console.log('inside user thunk', cart)
    await dispatch(actionLoadUserCarts(cart));
    return cart;
  }
};
//get current cart
export const getCurrentCartThunk = () => async (dispatch) => {
  const response = await fetch(`/api/carts/lastcurrent`);

  if (response.ok) {
    const cart = await response.json();
    console.log('inside current cart thunk', cart)
    await dispatch(actionLoadCurrentCart(cart));
    return cart;
  }
};



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
  // return res
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

////////////   REDUCER     ///////////////
const initialState = {
  allCarts: {},
  // singleCart: {},
  currentCart:{}
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CARTS:
            const allCarts = {};
            action.carts.forEach((cart)=> {
                allCarts[cart.id] = cart;
            });
            return {...state, allCarts: {...allCarts}};
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
        default:
            return state;
    }
}

export default cartReducer;