// Route Reducer
import { combineReducers } from "redux";

// reducers
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    alert,
    auth,
    profile
});