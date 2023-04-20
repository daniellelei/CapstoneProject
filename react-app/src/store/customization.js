const LOAD_CUSTOMIZATIONS = "customizations/load_all";
const LOAD_CUSTOMIZATION_DETAIL = "customizations/load_one";

////////   ACTIONS   //////////
export const actionLoadAllCustomizations = (customizations) => ({
  type: LOAD_CUSTOMIZATIONS,
  customizations,
});

export const actionLoadCustomizationDetail = (customization) => ({
  type: LOAD_CUSTOMIZATION_DETAIL,
  customization,
});


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