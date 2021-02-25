
import { applyMiddleware, createStore , compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from '../../reducers/CartReducers';
import { orderCreateReducer, orderDetailsReducer, orderUserListReducer, orderListReducer, } from '../../reducers/OrderReducers';
import { productDetailsReducer, productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, } from '../../reducers/ProductReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from '../../reducers/UserReducer';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems')) 
            : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    }
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer, 
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderUserList: orderUserListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;