import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/CartActions';
import CheckoutSteps from '../CheckoutSteps';

function ShippingPage(props) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    
    if (!userInfo){
        props.history.push('/login');
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(
            saveShippingAddress({fullName, address, city, postalCode, country})
        );
        props.history.push('/payment');
        //TODO: dispatch shipping address action
    };

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <br/>
            <form className="form f-90" onSubmit={submitHandler}>
                <div className="form-title">
                    <h1>SHIPPING ADDRESS</h1>
                </div>
                <div className="form-body">
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                            type="text" 
                            id="fullname" 
                            placeholder="Enter Full Name" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            placeholder="Enter Address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input 
                            type="text" 
                            id="city" 
                            placeholder="Enter City" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input 
                            type="text" 
                            id="postalCode" 
                            placeholder="Enter Postal Code" 
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)} 
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input 
                            type="text" 
                            id="country" 
                            placeholder="Enter Country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            required
                        ></input>
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">
                            Continue
                        </button>
                        <br/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ShippingPage;
