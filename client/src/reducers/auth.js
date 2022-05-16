// Import Alerts
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

// The default state
const initialState = {
    // The Token is located in the localserver for this build
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {
    
    const { type, payload } = action;
    
    switch(type) {
        // To load the user in on success
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
        // The State we want to display
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        // When fail on loading
        case REGISTER_FAIL:
            // Remove the token immediately
            localStorage.removeItem('token')
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}