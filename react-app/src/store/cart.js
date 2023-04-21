const LOAD_CARTS = "carts/load_all";
const LOAD_CART_DETAIL = "carts/load_one";

///////////   ACTIONS    //////////////
export const actionLoadAllCarts = (carts) => ({
  type: LOAD_CARTS,
  carts,
});

export const actionLoadCartDetail = (cart) => ({
  type: LOAD_CART_DETAIL,
  cart,
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


////////////   REDUCER     ///////////////
const initialState = {
  allCarts: {},
  singleCart: {},
  
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
            return {...state, singleCart: {...action.cart}}
        default:
            return state;
    }
}

export default cartReducer;