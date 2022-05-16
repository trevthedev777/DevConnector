import axios from 'axios';

/**Takes in a token,
 * if the token is bthere it adds to the headers,
 * if not it deletes it
 */
const setAuthToken = (token) => {

    // if theres a token, add it to the header
    if (token) {
        return axios.defaults.headers.common['x-auth-token'] = token;
    // if not delete it
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    };
};

export default setAuthToken;