import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Paramteres will display the msg and alert types
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    
    dispatch({ 
        type: SET_ALERT,
        payload:  { msg, alertType, id} 
    });

    // Remove Alerts in 5 seconds
    setTimeout(() => 
        dispatch({ 
            type: REMOVE_ALERT, 
            payload: id }), 
            timeout);
};