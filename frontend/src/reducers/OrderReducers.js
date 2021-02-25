import { ORDER_CREATE_FAILED, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAILED, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS } from "../constants/OrderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAILED:
            return {loading: false , error: action.payload};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = {loading: true, order:{}}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAILED:
            return {loading: false , error: action.payload};
        default:
            return state;
    }
};

export const orderUserListReducer = (state = {loading: true, orders: [] }, action) =>{
    switch(action.type){
        case ORDER_MINE_LIST_REQUEST:
            return {loading: true}
        case ORDER_MINE_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_MINE_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };