import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/CartActions';
import CheckoutSteps from '../CheckoutSteps';

function PaymentPage(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <br />
            <form className="form f-90" onSubmit={submitHandler}>
                <div className="form-title">
                    <h1>PAYMENT METHOD</h1>
                </div>
                <div className="form-body">
                    <div>
                        <br />
                        <div>
                            <input 
                                type="radio" 
                                id="cod" 
                                value="COD" 
                                name="paymentMethod" 
                                required 
                                checked 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="cod">{' '}Cash on Delivery (COD)</label>
                        </div>
                        <br />
                    </div>
                    <div>
                        <button className="primary" type="submit">Continue</button>
                        <br/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentPage;