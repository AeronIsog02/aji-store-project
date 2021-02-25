import Axios from "axios";
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_DETAILS_REQUEST,USER_DETAILS_FAILED,USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_SUCCESS } from "../constants/UserConstants"

export const login = (email , password ) => async (dispatch) => {
    dispatch({type: USER_LOGIN_REQUEST, payload: { email, password }})
    try{
        const {data} = await Axios.post('/api/users/login', {email,password});

        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_LOGIN_FAILED, 
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
    }
};

export const register = (name, email , password ) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: { email, password }})
    try{
        const { data } = await Axios.post('/api/users/register', {
            name,
            email,
            password
        });

        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){

        dispatch({
            type: USER_REGISTER_FAILED, 
            payload: 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        })
        
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
};

export const detailsUser = (userId) => async(dispatch, getState) =>{
    dispatch({type: USER_DETAILS_REQUEST, payload: userId});
    const {userLogin: {userInfo} } = getState();
    try{
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: USER_DETAILS_FAILED})
    }
};

export const updateUserProfile = (user) => async(dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST,payload: user})
    const { userLogin: {userInfo} } = getState();
    try{
        const { data } = await Axios.put(`/api/users/profile`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload:data});
        dispatch({type: USER_LOGIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAILED, payload: message});
    }
}
