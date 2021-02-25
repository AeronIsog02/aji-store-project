import { ORDER_CREATE_FAILED, 
        ORDER_CREATE_REQUEST, 
        ORDER_CREATE_SUCCESS, 
        ORDER_DETAILS_FAILED, 
        ORDER_DETAILS_REQUEST, 
        ORDER_DETAILS_SUCCESS, 
        ORDER_MINE_LIST_FAILED, 
        ORDER_MINE_LIST_REQUEST, 
        ORDER_MINE_LIST_SUCCESS,
        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_LIST_FAIL,
    } from "../constants/OrderConstants";
import Axios from "axios";
import { CART_EMPTY } from "../constants/CartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});

    try{
        const { userLogin: { userInfo } } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS , payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAILED, 
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const { userLogin: { userInfo } } = getState();
    try{
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message;
        dispatch({type: ORDER_DETAILS_FAILED, payload: message});
    }
};

export const listOrderUser = () => async (dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    const { userLogin: {userInfo} } = getState();
    try{
        const { data } = await Axios.get('/api/orders/user', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message;
        dispatch({type: ORDER_MINE_LIST_FAILED, payload: message});

    }
}

export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };