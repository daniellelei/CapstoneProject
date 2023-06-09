import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import drinkReducer from './drink';
import customizationReducer from './customization';
import cartReducer from './cart';
import postReducer from './post';
import commentReducer from './comment';
const rootReducer = combineReducers({
  session,
  drinks:drinkReducer,
  customizations:customizationReducer,
  carts:cartReducer,
  posts:postReducer,
  comments:commentReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
