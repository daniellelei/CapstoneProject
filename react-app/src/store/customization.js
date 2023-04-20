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
export const getAllCustomizationsThunk = () => async (dispatch) => {
  const response = await fetch("/api/customizations");
  if (response.ok) {
    const customizations = await response.json();
    await dispatch(actionLoadAllCustomizations(customizations));
    return customizations;
  }
  return response;
};

export const getCustomizationDetailThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/customizations/${id}`);

  if (response.ok) {
    const customization = await response.json();
    await dispatch(actionLoadCustomizationDetail(customization));
    return customization;
  }
};

export const createCustomization = (customization) => async (dispatch) => {
  const response = await fetch("/api/customizations", {
    method: "POST",
    body: customization,
  });

  if (response.ok) {
    const newCustomization = await response.json();
    const customization = newCustomization.Customization;
    await dispatch(actionCreateCustomization(customization));
    return customization;
  }
  return response.json();
};


////////   REDUCER   //////////
const initialState = {
  allCustomizations: {},
  singleCustomizations: {},
  
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
        default:
            return state;
        }
};

export default customizationReducer;