import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../../actions/OrderActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

export default function OrderPage(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    },[dispatch, orderId]);

    const orderHandler = (e) => {
        e.preventDefault();
        props.history.push('/');
    }

    return loading ? (
        <LoadingBox></LoadingBox>
    ): error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ): (        
        <div>
            
            <div className="form f-90 no-border">
                <h1>YOUR ORDER HAS BEEN PLACED.</h1>
            </div>
            <div className="form f-90">
                <div className="form-title">
                    <h1>ORDER ID: {' '} {order._id}</h1>
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
                                        {' '}{order.shippingAddress.fullName}<br />
                                        <strong>Address:</strong>
                                        {' '}{order.shippingAddress.address},
                                        {' '}{order.shippingAddress.city} ,
                                        {' '}{order.shippingAddress.postalCode}, 
                                        {' '}{order.shippingAddress.country}<br />
                                    </p>
                                    {order.isDelivered ? 
                                        <MessageBox variant="success"> Delivered at {order.deliveredAt} </MessageBox>
                                    :
                                        <MessageBox variant="danger">Not Delivered</MessageBox>
                                    }
                                    <br />
                                </div>
                            </li>
                            <li>
                                <div className="form-title">
                                    <h3>Payment</h3>
                                </div>
                                <div className="bg-white">
                                    <p className="form-body">
                                        <strong>Method:</strong> {order.paymentMethod} <br />    
                                    </p>
                                    <br />
                                    {order.isPaid ? 
                                        <MessageBox variant="success"> Paid at {order.paidAt} </MessageBox>
                                    :
                                        <MessageBox variant="danger">Not Paid</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="form-title">
                                    <h3>Order Items:</h3>
                                </div>
                                <div className="form-body bg-white">
                                    <ul>
                                        {
                                            order.orderItems.map((item) => (
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
                                        <div>PHP {order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping Fee</div>
                                        <div>PHP {order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>PHP {order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <hr />
                                    <div className="row">
                                        
                                        <div>
                                            <strong>Total</strong>
                                        </div>
                                        <div>PHP {order.totalPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    <div>
                        <br />
                        <button 
                            type="button" 
                            onClick={orderHandler} 
                            className="primary block"
                            >
                                Continue to Shop
                        </button>
                        <br />
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}
