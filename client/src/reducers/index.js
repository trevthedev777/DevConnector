// Route Reducer
import { combineReducers } from "redux";

// reducers
import alert from './alert';
import auth from './auth';

export default combineReducers({
    alert,
    auth
});