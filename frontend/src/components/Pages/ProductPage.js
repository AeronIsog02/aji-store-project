import React, { useEffect, useState } from 'react';
import Rating from '../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../MessageBox';
import LoadingBox from '../LoadingBox';
import { detailsProduct } from '../../actions/ProductActions';

function ProductPage(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productId));

    }, [dispatch,productId]);

    const addtoCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    return (
        <div>
            
            {loading ? <LoadingBox></LoadingBox>
            :error ? <MessageBox variant="danger" >{ error }</MessageBox>
            :
                <div>
                    <h1 className="p-title">PRODUCT</h1>
                    <br></br>
                    <div className="row top">
                        <div className="col-1">
                            <img 
                                className="large" 
                                src={ product.image } 
                                alt={ product.name } 
                            />
                        </div>
                        <div className="col-2">
                            <div className="form f-90-percent">
                                <div className="form-title">
                                    <h1>PRODUCT DETAILS</h1>
                                </div>
                                <ul className="form-body">
                                    <li>{ product.name }</li>
                                    <li>
                                        <Rating 
                                            rating={ product.rating } 
                                            numReviews={ product.numReviews } />
                                    </li>
                                    <li>Price: PHP { product.price }</li>
                                    <li>
                                        Description:
                                        <p>{ product.description }</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="form f-90-percent">
                                <ul className="form-body">
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price c-black">
                                                PHP { product.price }
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {
                                                    product.countInStock >0 
                                                    ? <span className="success">In Stock</span> 
                                                    : <span className="danger"> Unavailable </span>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select 
                                                            value={ qty } 
                                                            onChange={ e => setQty(e.target.value) }
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map( x => (
                                                                    <option key={ x+1 } value={ x + 1 }>{ x+1 }</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button onClick={addtoCartHandler} className="primary block">Add to Cart</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>        
    );    
}

export default ProductPage;