// Alerts
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// Create Alert
export default function( state = initialState, action ) {

    // Set action var to avoid repetitive code
    const { type, payload } = action;

    // Regular JavaScript Switch
    // Dispatch the alert
    // Return with string with new alert
    // Remove will delete all alerts except the one matching the payload (payload is id)

    switch(type) {
        case SET_ALERT:

            // States are immutable, Include all states here
            return [ ...state, payload ];

        case REMOVE_ALERT:

            // Payload is just the id
            return state.filter(alert => alert.id !== payload);
            
        default:
            return state;
    }
}