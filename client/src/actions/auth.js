import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User
export const register = ({ name, email, password}) => async dispatch => {

    // Access the backend
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Display this inforamtion as a String
    const body = JSON.stringify({ name, email, password });

    try {
        // Send Info to rest API/MongoDB
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data //Get Token
        })
    } catch (err) {

        const errors = err.response.data.errors;

        // display the dangers alert on every incorrect action
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}