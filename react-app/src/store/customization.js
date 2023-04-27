const LOAD_CUSTOMIZATIONS = "customizations/load_all";
const LOAD_CUSTOMIZATION_DETAIL = "customizations/load_one";
const LOAD_USER_CUSTOMIZATIONS = "customizations/load_user_customization";
// const LOAD_ADDEDTOCART_CUSTOMIZATIONS = "customizations/load_addedToCart_customizations";

const CREATE_CUSTOMIZATION = "customization/create"
const UPDATE_CUSTOMIZATION = "customization/update"
const REMOVE_CUSTOMIZATION = 'customization/delete'

const CLEAR_CUSTOMIZATION_DETAIL = "customizations/clear_customization_state";
const CLEAR_CUSTOMIZATIONS = "customizations/clear_customizations_state";
const CLEAR_SAVED_CUSTOMIZATIONS = "customizations/clear_saved_customizations";

                ////////   ACTIONS   //////////
export const actionLoadAllCustomizations = (customizations) => ({
  type: LOAD_CUSTOMIZATIONS,
  customizations,
});

export const actionLoadCustomizationDetail = (customization) => ({
  type: LOAD_CUSTOMIZATION_DETAIL,
  customization,
});

export const actionLoadUserCustomizations = (customizations) => ({
    type: LOAD_USER_CUSTOMIZATIONS,
    customizations
})

export const actionCreateCustomization = (customization) => ({
    type: CREATE_CUSTOMIZATION,
    customization
})

export const actionUpdateCustomization = (customization) => ({
    type: UPDATE_CUSTOMIZATION,
    customization
})

export const actionRemoveCustomization = (id) => ({
    type: REMOVE_CUSTOMIZATION,
    id
})

// export const actionLoadAddedToCartCustomiations = (customizations) => ({
//   type: LOAD_ADDEDTOCART_CUSTOMIZATIONS,
//   customizations
// })

export const actionClearCustomizations = () => ({
  type: CLEAR_CUSTOMIZATIONS,
});
export const actionClearCustomization = () => ({
  type: CLEAR_CUSTOMIZATION_DETAIL,
});
export const actionClearSavedCustomizations = () => ({
  type: CLEAR_SAVED_CUSTOMIZATIONS,
});

                  ////////   THUNKS     ////////////
//get all
export const getAllCustomizationsThunk = () => async (dispatch) => {
  const response = await fetch("/api/customizations");
  if (response.ok) {
    const customizations = await response.json();
    await dispatch(actionLoadAllCustomizations(customizations));
    return customizations;
  }
  return response;
};

//get one
export const getCustomizationDetailThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/customizations/${id}`);

  if (response.ok) {
    const customization = await response.json();
    // const customization = newCustomization.Customization;
    // console.log('inside thunk customization', customization)
    // console.log('inside thunk customization.id', customization.id)
    await dispatch(actionLoadCustomizationDetail(customization));
    return customization;
  }
};

//get current
export const getUserCustomizationThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/customizations/current`);

  if (response.ok) {
    const customization = await response.json();
    // console.log('inside user thunk', customization)
    await dispatch(actionLoadUserCustomizations(customization));
    return customization;
  }
};

//create
export const createCustomizationThunk = (customization) => async (dispatch) => {
  // console.log('hitting creat thunk', customization)
  const response = await fetch("/api/customizations/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customization),
  });

  if (response.ok) {
    const newCustomization = await response.json();
    const customization = newCustomization;
    // console.log('inside thunk customization', customization)
    // console.log('inside thunk customization.id', customization.id)
    
    await dispatch(actionCreateCustomization(customization));
    return customization;
  }
  return response.json();
};

//update
export const updateCustomizationThunk = (customization) => async (dispatch) => {
  const response = await fetch (`/api/customizations/${customization.id}`,{
    method:"PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customization),
  });

  if (response.ok) {
    const updatedCustomization = await response.json();
    
    await dispatch(actionUpdateCustomization(updatedCustomization));
    return updatedCustomization;
  }
  return response.json();
}

//delete
export const deleteCustomization = (customization) => async (dispatch) => {
  const response = await fetch(`/api/customizations/${customization.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionRemoveCustomization(customization.id));
    return await response.json();
  }
  return await response.json();
};

//add to cart
// export const addCustomizationToCartThunk = (customization) => async (dispatch) => {
  
//   const cartResponse = await fetch(`/api/carts/lastcurrent`);
//   const cart = await cartResponse.json();
  // console.log('add to cart**********', cart)

//   const response = await fetch(`/api/customizations/${customization.id}/addtocart`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(cart),
//   });

//   if (response.ok) {
//     const updatedCustomizations = await response.json();
//     console.log('addthunk', updatedCustomizations)
//     await dispatch(actionLoadAddedToCartCustomiations(updatedCustomizations));
//     return updatedCustomizations;
//   }
// };
                   ////////   REDUCER   //////////
const initialState = {
  allCustomizations: {},
  singleCustomization: {},
  allUserCustomizations:{}
  // cartCusts: {}
};

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_CUSTOMIZATIONS:
          const allCustomizations = {};
          action.customizations.forEach((customization) => {
              allCustomizations[customization.id] = customization;
          });
          return { ...state, allCustomizations: { ...allCustomizations } };
      case LOAD_CUSTOMIZATION_DETAIL:
          return { ...state, singleCustomization: { ...action.customization } };
      case LOAD_USER_CUSTOMIZATIONS:
        const allUserCustomizations = {};
        action.customizations.forEach((customization)=>{
          allUserCustomizations[customization.id] = customization;
        })
        return {...state, allUserCustomizations: {...allUserCustomizations}};
      // case LOAD_ADDEDTOCART_CUSTOMIZATIONS:
      //   const allCartCusts = {};
      //   console.log('inside reducer', action.customizations)
      //   action.customizations.forEach((customization) => {
      //     allCartCusts[customization.id] = customization;
      //   });
      //   return {...state, cartCusts: {...allCartCusts}}
      case CREATE_CUSTOMIZATION:
        return {
          ...state,
          allCustomizations:{...state.allCustomizations, [action.customization.id]:action.customization},
          singleCustomization: {...action.customization},
          allUserCustomizations:{...state.allUserCustomizations, [action.customization.id]: action.customization}
        }
      case UPDATE_CUSTOMIZATION:
        return {
          ...state,
          allCustomizations:{...state.allCustomizations, [action.customization.id]:action.customization},
          singleCustomization: {...action.customization},
          allUserCustomizations:{...state.allUserCustomizations, [action.customization.id]: action.customization}
        }
      case REMOVE_CUSTOMIZATION:
        const newState = {...state};
        delete newState.allCustomizations[action.id];
        delete newState.allUserCustomizations[action.id];
        return newState;
      case CLEAR_CUSTOMIZATIONS:
      return { ...state, allCustomizations: {} };
      case CLEAR_CUSTOMIZATION_DETAIL:
        return { ...state, singleCustomization: {} };
      case CLEAR_SAVED_CUSTOMIZATIONS:
        return { ...state, allUserCustomizations: {} };
      default:
          return state;
      }
};

export default customizationReducer;