import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// reducers specific to app logic - to see an annotated reducer, open src/redux/modules/multipleUsers.js
import battleData from './battleData.js';

/**
 * Exporting a default root reducer combining all the other ones
 * (including the reducer of the router, since we use redux-router and so the state of the router is in the store)
 */
export default combineReducers({
  routing,
  battleData,
});
