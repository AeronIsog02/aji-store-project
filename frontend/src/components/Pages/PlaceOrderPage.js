import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/OrderActions';
import { ORDER_CREATE_RESET } from '../../constants/OrderConstants';
import CheckoutSteps from '../CheckoutSteps';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

export default function PlaceOrderPage(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment');
    }
    
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading , success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a ,c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 1000 ? toPrice(0) : toPrice(100);
    cart.taxPrice = toPrice(0.12 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };

    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    },[dispatch, order, props.history, success]);

    return (        
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <br />
            <div className="form f-90">
                <div className="form-title">
                    <h1>ORDER DETAILS</h1>
                </div>
                <div className="form-body">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="form-title">
                                    <h3>Shipping</h3>
                                </div>
                                <div className="bg-white">
                                    <p className="form-body">
                                        <strong>Name:</strong>
                                        {' '}{cart.shippingAddress.fullName}<br />
                                        <strong>Address:</strong>
                                        {' '}{cart.shippingAddress.address},
                                        {' '}{cart.shippingAddress.city} ,
                                        {' '}{cart.shippingAddress.postalCode}, 
                                        {' '}{cart.shippingAddress.country}<br />
                                    </p>
                                    <br />
                                </div>
                            </li>
                            <li>
                                <div className="form-title">
                                    <h3>Payment</h3>
                                </div>
                                <div className="bg-white">
                                    <p className="form-body">
                                        <strong>Method:</strong> {cart.paymentMethod} <br />    
                                    </p>
                                    <br />
                                </div>
                            </li>
                            <li>
                                <div className="form-title">
                                    <h3>Order Items:</h3>
                                </div>
                                <div className="form-body bg-white">
                                    <ul>
                                        {
                                            cart.cartItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img className="small" src={item.image} alt={item.name}></img>
                                                        </div>
                                                        <div>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.qty} x PHP {item.price.toFixed(2)} = PHP {(item.qty * item.price).toFixed(2)}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="form f-90">
                        <div className="form-title">
                            <h3>Order Summary</h3>
                        </div>
                        <div className="form-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Total Items</div>
                                        <div>PHP {cart.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping Fee</div>
                                        <div>PHP {cart.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>PHP {cart.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <hr />
                                    <div className="row">
                                        
                                        <div>
                                            <strong>Total</strong>
                                        </div>
                                        <div>PHP {cart.totalPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button 
                            type="button" 
                            onClick={placeOrderHandler} 
                            className="primary block"
                            disabled={cart.cartItems.length === 0}
                            >
                                Place Order
                        </button>
                        <br />
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}
