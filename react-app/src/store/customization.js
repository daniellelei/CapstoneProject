const LOAD_CUSTOMIZATIONS = "customizations/load_all";
const LOAD_CUSTOMIZATION_DETAIL = "customizations/load_one";
const LOAD_USER_CUSTOMIZATIONS = "customizations/load_user_customization";

const CREATE_CUSTOMIZATION = "customization/create"
const UPDATE_CUSTOMIZATION = "customization/update"
const REMOVE_CUSTOMIZATION = 'customization/delete'

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
    console.log('inside thunk customization', customization)
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
    await dispatch(actionLoadUserCustomizations(customization));
    return customization;
  }
};

//create
export const createCustomizationThunk = (customization) => async (dispatch) => {
  console.log('hitting creat thunk', customization)
  const response = await fetch("/api/customizations/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customization),
  });

  if (response.ok) {
    const newCustomization = await response.json();
    const customization = newCustomization.Customization;
    console.log('inside thunk customization', customization)
    console.log('inside thunk customization.id', customization.id)
    
    await dispatch(actionCreateCustomization(customization));
    return customization;
  }
  return response.json();
};

//update
export const updateCustomizationThunk = (customization) => async (dispatch) => {
  const response = await fetch (`/api/customizations/${customization.id}`,{
    method:"PATCH",
    body:customization,
  });

  if (response.ok) {
    const updatedCustomization = await response.json();
    const updated_customization = updatedCustomization.customization;
    await dispatch(actionUpdateCustomization(updated_customization));
    return updated_customization;
  }
  return response.json();
}

//delete
export const deleteCustomization = (customization) => async (dispatch) => {
  const response = await fetch(`/api/Customizations/${customization.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionRemoveCustomization(customization.id));
    return await response.json();
  }
  return await response.json();
};

                   ////////   REDUCER   //////////
const initialState = {
  allCustomizations: {},
  singleCustomization: {},
  
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
        return {...state, allCustomizations: {...allUserCustomizations}};
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
          singleCustomization: {},
          allUserCustomizations:{...state.allUserCustomizations, [action.customization.id]: action.customization}
        }
      case REMOVE_CUSTOMIZATION:
        const newState = {...state};
        delete newState.allCustomizations[action.id];
        delete newState.allUserCustomizations[action.id];
        return newState;
      default:
          return state;
      }
};

export default customizationReducer;