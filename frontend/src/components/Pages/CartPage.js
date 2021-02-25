import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../MessageBox';
import { addToCart, removeFromCart } from '../../actions/CartActions';

export default function CartPage(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch,productId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        props.history.push('/login?redirect=shipping');
    }

    return (
        <div>
            <div>
                <h1 className="p-title">Cart</h1>
                {
                    cartItems.length === 0 
                    ? <MessageBox> Cart is empty. <Link to="/">Go Shopping</Link> </MessageBox>
                    : 
                    (
                        <div className="form f-90-percent m-auto">
                            <div className="form-title">
                                <h1>ITEMS</h1>
                            </div>
                            <ul className="form-body">
                                {
                                    cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img className="small" src={item.image} alt={item.name}></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {[...Array(item.countInStock).keys()].map( x => (
                                                            <option key={ x+1 } value={ x + 1 }>{ x+1 }</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    PHP {item.price}
                                                </div>
                                                <div>
                                                    <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                }
                <div className="form f-90-percent m-auto bg-white">
                    <ul className="form-body">
                        <li>
                            <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): PHP {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}</h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
